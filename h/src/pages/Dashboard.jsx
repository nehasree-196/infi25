import React from 'react';

const Dashboard = () => (
  <section className="section">
    <h2>Welcome to Your Dashboard</h2>
    <p>Track your referrals, points, and see where you stand in the leaderboard!</p>
    <div className="dashboard-content">
      <p>📢 Your Referral Link: <code>festname.com/register?ref=YOURCODE</code></p>
      <p>⭐ Points: 120</p>
      <p>🏆 Leaderboard Rank: #5</p>
      <p>🎁 Rewards Earned: Goodies + Certificate</p>
    </div>
  </section>
);

export default Dashboard;
