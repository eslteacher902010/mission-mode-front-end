import * as missionService from './services/missionService';
import { useState, useEffect } from 'react';

import NavBar from './components/NavBar/NavBar';
import MissionList from './components/MissionList/MissionList';
import MissionDetail from './components/MissionDetail/MissionDetail';
import MissionForm from './components/MissionForm/MissionForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import SignOut from './components/SignOut/SignOut';
import MissionTimer from './components/MissionTimer/MissionTimer';
import RequireAuth from "./components/RequireAuth/RequireAuth";
import * as badgeService from "./services/badgeService";
import PublicShowcase from './components/PublicShowcase/PublicShowcase';
import WebReminders from './hooks/WebReminders.jsx';
import { Routes, Route } from 'react-router-dom';
import DemoMission from "./components/DemoMission/DemoMission.jsx";
import * as authService from "./services/authService";



import './App.css';

const App = () => {
  const [missions, setMissions] = useState([]);
  const [badges, setBadges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState(null);
  const completedCount = missions.filter(m => m.status === "completed").length;
  const earnedBadges = badges.filter(b => completedCount >= b.pointsRequired);
  const nextBadge = badges.find(b => completedCount < b.pointsRequired);
  const [showDemo, setShowDemo] = useState(false);

  



  // Define fetchMissions BEFORE useEffect
  const fetchMissions = async () => {
    try {
      const fetchedMissions = await missionService.index();
      setMissions(fetchedMissions);
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  };

  useEffect(() => {
  const currentUser = authService.getCurrentUser();
  setUser(currentUser);
}, []);



  useEffect(() => {
  async function fetchBadges() {
    try {
      const fetched = await badgeService.index();
      setBadges(fetched);
    } catch (err) {
      console.error("Error fetching badges:", err);
    }
  }

  fetchBadges();
}, []);

const [prevCompletedCount, setPrevCompletedCount] = useState(0);

useEffect(() => {
  if (completedCount > prevCompletedCount) {
    const newlyEarned = badges.filter(
      b =>
        completedCount >= b.pointsRequired &&
        prevCompletedCount < b.pointsRequired
    );

    if (newlyEarned.length > 0) {
      const badge = newlyEarned[0];
      alert(`🎉 Congratulations! You've earned ${badge.name} ${badge.icon}`);
    }

    setPrevCompletedCount(completedCount);
  }
}, [completedCount, badges]);



  // Fetch missions ONLY when user logs in
  useEffect(() => {
    if (user) { 
      fetchMissions();
    }
  }, [user]);

  const handleSelect = (mission) => {
    setSelected(mission);
    setIsFormOpen(false);
  };

  const handleFormView = (mission) => {
    if (!mission) {
      setSelected(null);
    } else {
      setSelected(mission);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelected(null);
  };

  const handleSignOut = () => {
    setUser(null);
    setMissions([]); // optional: clear missions when logged out
  };

const handleAddMission = async (formData) => {
  try {
    let durationMinutes = Number(formData.duration);

    if (formData.missionType === "daily") {
      durationMinutes *= 24 * 60;
    }

    const newMission = {
      ...formData,
      duration: durationMinutes,        // normalized
      status: "active",
      startTime: new Date(),
      remainingMs: durationMinutes * 60 * 1000,
      lastResumedAt: new Date(),
    };

    await missionService.create(newMission);

    fetchMissions();
    setIsFormOpen(false);
  } catch (err) {
    console.error("Error adding mission:", err);
  }
};



  const handleUpdateMission = async (formData, missionId) => {
    try {
      await missionService.update(formData, missionId);
      fetchMissions();

      // if (formData.status === "completed") {
      //   checkForNewBadges();
      //   }

      const updatedSelected = missions.find((m) => m._id === missionId);
      setSelected(updatedSelected);

      setIsFormOpen(false);
    } catch (err) {
      console.error('Error updating mission:', err);
    }
  };

  const handleDeleteMission = async (missionId) => {
    try {
      await missionService.deleteMission(missionId);
      fetchMissions();
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const hasDailyReminders = missions.some(
  m => m.remindDaily && m.status === "active"
);


  // const checkForNewBadges = () => {
  //   const completedCount = missions.filter(m => m.status === "completed").length;
  //   const newlyEarned = badges.filter(
  //   b => completedCount >= b.pointsRequired &&
  //        completedCount < b.pointsRequired // this compares BEFORE vs AFTER
  // );

  //   if (newlyEarned.length > 0) {
  //     const badge=newlyEarned[0];
  //     alert(`Congratulations! You've earned a new badge: ${badge.name} ${badge.icon}`);
  //   }
  // };

return (
  <>
    <NavBar user={user} setUser={setUser} />
    {/* web notifications */}
    {user && hasDailyReminders && <WebReminders />}




    {user && nextBadge && (
      <div className="top-bar">
        <p className="top-bar-text">
          {nextBadge.pointsRequired - completedCount} missions until{" "}
          {nextBadge.name} {nextBadge.icon}
        </p>
      </div>
    )}

    <Routes>
      {/* PUBLIC ROUTES (ALWAYS AVAILABLE) */}
      <Route path="/sign-up" element={<SignUpForm />} />
      <Route path="/sign-in" element={<SignInForm setUser={setUser} />} />
      <Route path="/sign-out" element={<SignOut setUser={setUser} />} />

      {/* HOME ROUTE */}
      <Route
        path="/"
        element={
          !user ? (
  <>
    <PublicShowcase onDemoClick={() => setShowDemo(true)} />
  

    {/* DEMO FLOATING PANEL */}
{showDemo && (
  <div className="demo-float">
    <DemoMission />

    <button
      className="demo-close"
      onClick={() => setShowDemo(false)}
      aria-label="Close demo"
    >
      ✕
    </button>
  </div>
)}
  </>
          )
  : (
            <div className="app-layout">
              <aside className="sidebar-container">
                <MissionList
                  missions={missions}
                  fetchMissions={fetchMissions}
                  handleSelect={handleSelect}
                  handleFormView={handleFormView}
                  closeForm={closeForm}
                  isFormOpen={isFormOpen}
                  user={user}
                />
              </aside>

              <main className="details-container">
                {nextBadge && (
                  <section className="badge-section">
                    <div className="badge-header">
                      <h1>Your Badges</h1>
                    </div>

                    <div className="badge-list">
                      {earnedBadges.length === 0 ? (
                        <p className="empty-state">
                          Complete missions to earn badges 🏆
                        </p>
                      ) : (
                        earnedBadges.map(b => (
                          <div key={b._id || b.id} className="badge-card earned">
                            <span className="badge-icon">{b.icon}</span>
                            <span className="badge-name">{b.name}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                )}

                {isFormOpen ? (
                  <RequireAuth>
                    <MissionForm
                      handleAddMission={handleAddMission}
                      selected={selected}
                      handleUpdateMission={handleUpdateMission}
                    />
                  </RequireAuth>
                ) : (
                  <MissionDetail
                    selected={selected}
                    handleFormView={handleFormView}
                    handleDeleteMission={handleDeleteMission}
                  />
                )}
              </main>
            </div>
          )
        }
      />
    </Routes>
  </>
);
};

export default App;