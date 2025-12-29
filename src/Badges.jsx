import * as badgeService from './services/badgeService';
import { useState, useEffect } from 'react';

import BadgeList from './components/BadgeList/BadgeList';
import BadgeDetail from './components/MissionDetail/MissionDetail';

import './App.css';

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const fetchedBadges = await badgeService.index();
        setBadges(fetchedBadges);
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    fetchBadges();
  }, []);

  const handleSelect = (badge) => {
    setSelected(badge);
  };


  return (
    <>
      <BadgeList  
        badges={badges}
        handleSelect={handleSelect}
        />
    {selected && (
        <BadgeDetail badge={selected} />
      )}
    </>

  );
};

export default Badges; ;
