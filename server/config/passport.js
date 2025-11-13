const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const db = require('../config/db'); // MySQL connection
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [profile.emails[0].value]);

        if (rows.length === 0) {
          const [result] = await db.query(
            'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
            [profile.displayName, profile.emails[0].value, 'customer']
          );
          const user = { id: result.insertId, name: profile.displayName, email: profile.emails[0].value };
          return done(null, user);
        } else {
          return done(null, rows[0]);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
