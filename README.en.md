# Waltz

A one-key rhythm game in the night sky: the sun and the moon spin around each other on a path of tiles. When the spinning one touches the next tile, tap: it lands, and the other one starts spinning. The path is drawn by the music. Play the 1200 tracks from the Rythme plugin, or your own music.

*Version française : [README.md](README.md)*

## How to play

- **Any key** (letters, arrows, Enter) or a **click**: land the orb on the golden tile.
- **Reading the path**: the orb spins half a turn per beat. A **straight line** lasts one beat, a **right angle** half a beat, a **sharp turn** a quarter of a beat.
- **Three blue dots** on a tile: the orb spins slower there (a long pause in the music).
- **A pink loop**: the orb changes its spinning direction.
- A missed tile turns red, but the game goes on: the orb always follows the music.
- **Space**: play · **P**: pause · **Full screen** during the game.

## Accuracy and points

Notes are judged by how far they are from the right moment: **Perfect** (about ±45 ms), **Good** (±90 ms), **OK** (±140 ms), otherwise a miss.

A note's points rise by 1 % per note of combo, up to double at 100 notes in a row; a miss resets the combo. At the end, accuracy gives a grade: **S** from 95 %, **A** at 90 %, **B** at 80 %, **C** at 70 %, **D** below.

## Songs and difficulty

The **Songs** tab has the 1200 Rythme tracks, in four difficulties (Easy, Normal, Hard, Expert). Each level's difficulty is computed from its notes (density, busy passages), from 1 to 10 stars.

## My music

In **My music**, create a level from an imported **audio file** or a track from your **NeoMusic** library: the game finds its tempo and strong beats and turns them into a level, at the chosen **difficulty** (1 to 10 stars).

## Camera, practice and figure

- **Camera** (setting, Effects by default): every 8 bars, the camera zooms in, pulls back, slowly turns, sways or pulses on the beat. **Fixed** turns it off.
- **Start** (practice): begin at 25, 50 or 75 % of the song to work on a passage. Earlier notes don't count, and nothing is kept as a record.
- **Flawless**: the end screen gives the share of the song played before your first miss, and your record on this level.
- The end screen also shows **the figure drawn by the whole path**, cleared tiles in green and missed ones in red.

## Settings

- Music **volume**.
- **Hit sound**: the sound played on each note you hit, one of 10 (Soft, Clap, Wood, Kick, Crystal, Pop, Hi-hat, Snare, Pluck, Tock) or none. Losing a combo of 10 or more plays a « combo break » sound.
- **Offset** (−300 to +300 ms): it adjusts itself after each game based on your average lateness or earliness; you can also change it by hand.

## Data and sync

Your scores and grades per level and your settings are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Waltz → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

## What's new in version 1.1.0

- **Gamepad**: the D-pad, A, B, X, Y and the shoulder buttons place the star; Start starts the song (A too, outside a game); Select pauses.
- **Accuracy curve** on the end screen: your precision all along the song, with missed notes marked in red underneath, to see where you lost the beat.
