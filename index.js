const express = require('express');
const { createClient } = require('bedrock-protocol');

const app = express();
app.get('/', (req, res) => res.send('✅ Bedrock AFK Bot is ALIVE! Pinged by UptimeRobot'));
app.listen(process.env.PORT || 3000, () => console.log('Web server running for UptimeRobot'));

// ================== BEDROCK BOT PART ==================
const client = createClient({
  host: 'Peacefulseed.aternos.me',   // ← CHANGE THIS
  port: 55157,
  username: 'AFKGobindaBot',       // ← your bot gamertag
  offline: true,                   // ← Set false only if you add full auth (harder)
  // version: '1.26.3.1'            // ← match your Aternos version if needed
});

client.on('join', () => {
  console.log('🤖 Bot joined the server!');
  // Keep moving/jumping every 40 seconds so Aternos doesn't kick
  setInterval(() => {
    if (client.entity) {
      client.write('move_player', {
        runtime_id: client.runtimeEntityId,
        position: {
          x: client.entity.position.x + (Math.random() * 0.2 - 0.1),
          y: client.entity.position.y + 0.1,
          z: client.entity.position.z + (Math.random() * 0.2 - 0.1)
        },
        rotation: { x: 90, y: 0 },
        on_ground: true
      });
    }
  }, 40000);
});

client.on('disconnect', () => {
  console.log('Disconnected... (restart manually or add reconnect code)');
});

client.on('error', err => console.error(err));
