# BMI: The Judgment Engine
## Useless Projects 3.0 — Project Specification & Build Blueprint

> **Working title:** BMI: The Judgment Engine  
> **Tagline:** A perfectly normal BMI calculator that takes your result far too seriously.  
> **Project type:** Single-page web application / interactive meme experience  
> **Primary goal:** Build a polished, technically sound BMI calculator whose core purpose is deliberately ridiculous: calculating BMI and dramatically judging the result with memes, sounds, animations, Easter eggs, and optional AI-generated commentary.

---

# 1. Project Vision

The website should initially look like a legitimate, modern health/fitness web application.

The user enters their information, clicks **Calculate BMI**, and expects a normal result.

Instead, the site gradually reveals an absurd personality:

1. Collect basic information.
2. Calculate BMI accurately.
3. Display the BMI and standard adult BMI category.
4. Reveal a humorous verdict.
5. Trigger special-number Easter eggs where appropriate.
6. Play a suitable meme sound when available.
7. Animate the result.
8. Optionally request a short AI-generated personalized roast.
9. Allow the user to calculate again or share the result.

The comedy should come from **contrast**:
- polished interface → ridiculous result
- legitimate calculation → completely unnecessary dramatic treatment
- restrained UI → sudden meme reaction

The project must not become visually chaotic all the time.

---

# 2. Core Product Principle

## Build small, polish hard.

The project must be fully functional without:
- AI
- login
- a database
- real payments
- external APIs
- internet access
- advanced hardware

Optional features must never break the core experience.

The priority order is:

1. Correct BMI calculation
2. Excellent UI/UX
3. Meme/reaction system
4. Animations and audio
5. Easter eggs
6. AI enhancement
7. Share-result functionality
8. Login/BMI history only if substantial time remains

Do not sacrifice a working core for an unfinished advanced feature.

---

# 3. Intended User Flow

## Screen 1 — Landing Page

The landing page should look like a legitimate premium BMI/health calculator.

Suggested content:

**BMI CALCULATOR**

"Measure your BMI."

Small supporting text explaining that BMI is a general screening measure, not a diagnosis.

Inputs:
- Age
- Sex
- Unit system
- Height
- Weight

Primary button:

**Calculate BMI**

The visual design should be clean, modern, slightly dark, and blue-toned.

Do not reveal the full meme nature immediately.

---

# 4. Input System

## Required Inputs

### Age
Numeric input.

### Sex
Simple selection:
- Male
- Female
- Prefer not to say

Sex is collected primarily for contextual/personalization purposes. The core adult BMI calculation should not be altered based on sex.

### Unit system

Two options:

**Metric**
- Height in centimetres
- Weight in kilograms

**Imperial**
- Height in feet/inches
- Weight in pounds

The UI should make switching units simple.

---

# 5. BMI Calculation

For adults, calculate BMI using the standard formula:

BMI = weight (kg) / height (m)^2

For imperial input, convert pounds to kilograms and inches to metres before calculation.

Display BMI to approximately one decimal place, while retaining the underlying numeric value for comparisons and Easter-egg logic.

## Important medical boundary

This is a humorous project, not a medical diagnostic tool.

For adult users, use standard adult BMI categories:

- Under 18.5 — Underweight
- 18.5 to <25 — Normal/Healthy range
- 25 to <30 — Overweight
- 30+ — Obesity

Do not make medical claims beyond the basic BMI category.

Do not use the same adult BMI classification as a medical judgment for children/teenagers. If the entered age is below 18, either:
- show a clear "adult BMI categories are not appropriate here" message and provide the numeric BMI only, or
- gracefully explain that the parody calculator is intended for adults.

The safest MVP is to make the experience explicitly **18+** and prevent/redirect under-18 calculations.

---

# 6. Result Reveal

The result should NOT appear all at once.

After clicking Calculate:

### Stage 1
A short, polished calculation animation.

Example:
"Analyzing..."

### Stage 2
Reveal:

**YOUR BMI**

# 23.2

### Stage 3
Reveal:

**CATEGORY**

Normal / Healthy range

### Stage 4
Reveal the humorous verdict.

Example:

> "Okay. You escaped the allegations."

### Stage 5
If a special trigger is detected, interrupt the normal result with the Easter egg.

Example:

> **67 KG DETECTED**

# SIX SEVEN

Then play the associated sound if available.

The entire sequence should feel intentional and polished rather than like random pop-ups.

---

# 7. Roast System

The roast engine is one of the main entertainment features.

## Tone

The intended tone is:

**Unhinged, playful, and savage — but bounded.**

The system must NOT:
- harass the user
- encourage self-harm
- encourage eating disorders
- encourage dangerous weight loss
- shame eating disorders
- make cruel personal attacks
- make jokes about protected characteristics
- use sexual jokes or sexual references
- use the excluded number 69 as an Easter egg
- give dangerous medical advice

The roast should target the **situation/result**, not the person's worth.

---

# 8. Roast Categories

## Underweight

Tone:
- concerned
- absurd
- playful

Example style:
> "Your BMI is asking where the rest of you went."

Avoid suggesting starvation, eating disorders, or dangerous dieting.

## Normal / Healthy range

Tone:
- approving
- slightly cocky

Example style:
> "Congratulations. Your spreadsheet of life is currently balanced."

## Overweight

Tone:
- noticeably more savage

Example style:
> "Your BMI has entered the group chat and it has concerns."

## Obesity

Tone:
- maximum comedic intensity, but still bounded

Example style:
> "Your BMI didn't just cross the line. It brought luggage."

Never encourage extreme dieting or make medical threats.

---

# 9. Roast Library

Use a curated local library of multiple reactions.

Target:
- 8–15 reactions per category if time allows.
- Minimum viable target: 5 per category.

The system should randomly select from appropriate reactions so repeated calculations do not always produce identical text.

Reactions should be deterministic enough to feel intentional but varied enough to remain fun.

---

# 10. Special Number / Easter Egg Engine

Special-number reactions have priority over normal random meme reactions.

Initial special values:

### 42
Reference:
"The answer to everything."

Possible reaction:
> "You found the answer to life, the universe, and this unnecessary website."

### 50
Reaction:
**HALF CENTURY**

Use a cricket-inspired presentation.

### 67
Reaction:
# SIX SEVEN

This is a major Easter egg.

One of the supplied local audio files is the **67 meme sound**.

When the relevant trigger is reached, play that audio.

### 73
Reference to the "best number" / Big Bang Theory style joke.

### 77
Lucky/double-seven themed reaction.

### 88
Double-eight themed reaction.

### 99
Reaction:
> "ONE MORE."

Then build suspense toward 100.

### 100
Reaction:
# CENTURY

Make this visually dramatic.

## Excluded

**69 must never be used.**

Do not:
- create a 69 Easter egg
- mention it in UI
- create a 69 meme
- use it in documentation as an example of a trigger
- include it in generated reactions

---

# 11. Trigger Precision

Special triggers should be based primarily on **weight in kilograms**, because examples such as 67 kg, 50 kg, and 100 kg refer to weight.

Use a sensible tolerance only if necessary.

Preferred behavior:
- exact integer kilogram input triggers the special reaction
- converted imperial values should also be capable of triggering the same weight-based Easter egg after conversion, using a small tolerance to account for conversion/rounding

Do not let rounding create accidental triggers constantly.

Special triggers should be evaluated before generic reactions.

Priority:

1. Critical safety/input validation
2. Special Easter egg
3. BMI category reaction
4. Random meme reaction
5. Optional AI roast

---

# 12. Meme Audio System

There will eventually be **6 supplied meme audio files**.

One is the **67 meme sound**.

The remaining five are supplied by the project creator later.

The assets should live locally inside the project, for example:

/public/assets/sounds/

Suggested names:

- `meme-67.mp3`
- `meme-02.mp3`
- `meme-03.mp3`
- `meme-04.mp3`
- `meme-05.mp3`
- `meme-06.mp3`

Do not assume the filenames above are final. Inspect the actual supplied assets and map them correctly.

## Audio behavior

- Provide a visible mute/unmute control.
- Respect browser autoplay restrictions.
- Prefer triggering audio after a user interaction such as pressing Calculate.
- Do not automatically play audio on page load.
- If an audio file is missing or fails, continue silently.
- Audio must never break the calculation flow.
- Use appropriate random sounds for generic meme reactions.
- Special sounds such as the 67 sound should be deterministic.

## Copyright

Use only audio assets that the project creator is permitted to use or that are appropriate for the event/project context.

Do not download copyrighted material automatically.

---

# 13. Random Meme System

If no special Easter egg is triggered:

1. Determine BMI category.
2. Select a suitable reaction.
3. Optionally select one of the available generic meme sounds.
4. Play the sound after the result is revealed.
5. Animate the reaction.

The random system should avoid selecting the same sound repeatedly when possible.

A simple shuffle-bag or no-immediate-repeat system is preferable to pure `Math.random()` repetition.

---

# 14. Visual Design

## Overall style

**Serious → ridiculous.**

The landing/input screens should look like a polished modern application.

Suggested visual direction:
- dark-ish background
- lighter blue primary accents
- subtle gradients if tasteful
- high readability
- clean typography
- generous spacing
- modern cards
- restrained shadows
- subtle borders
- premium appearance

Avoid:
- excessive neon
- overly saturated blue
- gamer aesthetics
- excessive glassmorphism
- giant emoji everywhere
- clutter
- constant animations

The site should initially look credible.

---

# 15. Result Visuals

The result screen can become more expressive.

Use:
- smooth number count-up
- progress indicators
- subtle entrance animations
- category badge
- animated roast
- occasional particles/confetti
- special Easter-egg animations
- controlled audio reactions

Do not shake the entire website for every result.

Chaos should happen only when the result earns it.

---

# 16. AI Integration

AI is an enhancement, not the foundation.

## AI responsibility

After the normal result has been generated, optionally ask an AI model to produce one short personalized humorous reaction.

Inputs may include:
- BMI
- category
- age
- weight
- selected context

Do not send unnecessary personal information.

## AI output requirements

The AI response must:
- be short
- be funny
- match the category
- be playful/unhinged
- remain within the safety boundaries
- not provide medical advice
- not encourage dangerous weight loss
- not mention excluded sexual content
- not use 69 as a joke
- not attack protected characteristics
- not imply diagnosis

Suggested maximum:
15–25 words.

## Critical fallback

If:
- API key is missing
- internet is unavailable
- API request fails
- request times out
- response is malformed

then use the local curated roast library.

The user should not see a technical error merely because AI is unavailable.

The core application must work offline.

---

# 17. No Chatbot

Do NOT turn the project into a general AI chatbot.

The AI should exist only as a small enhancement to the result experience.

This keeps the project:
- focused
- funny
- finishable
- reliable

---

# 18. Share Result

If time permits, provide:

**Share My Result**

The share experience should create a visually attractive result card.

Example:

BMI: 23.2
Category: Normal
Verdict: "Okay. You escaped the allegations."

Include the project branding.

Use the browser's native share API where supported and provide a copy/download fallback.

This is optional after the core is stable.

---

# 19. Login & BMI History — OPTIONAL FINAL FEATURE

Only implement this if the core project is already polished and reliable.

Do not allow authentication work to jeopardize the main project.

Potential future flow:

### Sign up
User creates an account.

### Login
User returns later.

### BMI history
Store previous BMI records with dates.

Example:

Previous:
BMI 28.4 — 11 Sep 2026

Current:
BMI 24.1 — 25 Sep 2026

Reaction:

> "DOWN 4.3"
>
> "OH? LOOK WHO DECIDED TO GET THEIR LIFE TOGETHER."

If BMI rises:

> "You went backwards. Impressive."

Because BMI is health-related data, minimize stored information and avoid collecting unnecessary personal details.

This feature is explicitly **Phase 2 / stretch goal**.

---

# 20. Data Architecture

MVP should require no database.

All core logic should be local.

Possible structure:

/project-root
  /public
    /assets
      /sounds
      /images
  /src
    /components
    /data
    /lib
    /styles
  package.json
  README.md
  PROJECT.md

Exact framework is up to the coding agent, but prefer a modern, stable web stack that runs easily on macOS and can be developed quickly.

Do not introduce unnecessary infrastructure.

---

# 21. Suggested Component Structure

Possible components:

- `LandingPage`
- `BmiForm`
- `UnitToggle`
- `ResultReveal`
- `BmiDisplay`
- `CategoryBadge`
- `RoastCard`
- `MemeReaction`
- `AudioController`
- `EasterEggEngine`
- `AiRoast`
- `ShareResult`
- `MuteButton`

These are suggestions, not mandatory names.

Keep components understandable.

---

# 22. Core Logic Separation

Separate:

### Calculation logic
BMI formula and conversions.

### Classification logic
BMI category.

### Easter-egg logic
Special number detection.

### Roast logic
Category-based local reactions.

### Audio logic
Sound selection and playback.

### AI logic
Optional API call + fallback.

This separation makes debugging much easier.

---

# 23. Input Validation

Handle:
- empty fields
- zero
- negative numbers
- absurdly large values
- invalid text
- invalid height
- invalid weight
- invalid age
- unit switching

Do not allow calculation with invalid values.

Error messages should remain in the personality of the website where appropriate.

Example:

> "Height cannot be 0 cm. Physics has declined to participate."

But critical validation should remain clear.

---

# 24. Accessibility

Include:
- keyboard navigation
- visible focus states
- semantic labels
- sufficient text contrast
- accessible buttons
- mute control
- reduced-motion support
- no essential information conveyed only through sound or color

The application should remain usable when muted.

---

# 25. Responsive Design

Primary target:
- desktop/laptop
- mobile browser

It must look good on a laptop because the project will be demonstrated from a MacBook.

It should also be usable on a phone.

Do not create separate native mobile applications.

---

# 26. Error Philosophy

Never let a secondary feature kill the application.

If:
- audio fails → continue without audio
- AI fails → use local roast
- sharing fails → show copy option
- animation fails → show static result
- network disappears → core still works

The calculation and result must always remain functional.

---

# 27. Performance

Keep the application lightweight.

Avoid:
- huge libraries
- unnecessary dependencies
- huge image/video assets
- complex 3D
- unnecessary backend services

Animations should remain smooth.

Audio clips should be reasonably small.

---

# 28. Testing Checklist

Before declaring the MVP complete, test:

### Metric
- normal BMI
- underweight
- overweight
- obesity

### Imperial
- equivalent values produce approximately the same BMI

### Special numbers
- 42
- 50
- 67
- 73
- 77
- 88
- 99
- 100

### Exclusion
- 69 does not trigger anything special.

### Audio
- 67 audio works
- mute works
- missing audio doesn't crash the app

### AI
- AI works if configured
- fallback works without AI
- invalid API response does not crash the app

### Validation
- empty input
- zero
- negative
- non-numeric
- unrealistic values

### Responsive
- laptop
- mobile-sized viewport

### Accessibility
- keyboard
- mute
- reduced motion

---

# 29. Time Strategy

Approximately 14.5 hours remain.

The project is being built by one beginner.

Therefore:

## Priority 1 — Must have
- BMI calculation
- metric/imperial
- polished landing page
- result reveal
- category
- roast system
- special numbers
- 67 sound
- mute
- responsive layout

## Priority 2 — Should have
- remaining meme sounds
- additional animations
- Easter eggs
- AI roast
- share result

## Priority 3 — Only if time remains
- login
- BMI history
- database
- richer sharing
- additional advanced effects

Never move to Priority 3 while Priority 1 is unfinished.

---

# 30. Demo Strategy

The demo should be short.

Recommended sequence:

1. Open the serious-looking website.
2. Enter an ordinary example.
3. Calculate.
4. Show the polished result and roast.
5. Calculate again with **67 kg**.
6. Trigger the **SIX SEVEN** Easter egg.
7. Let the sound/animation play.
8. Briefly demonstrate another special number such as 100.
9. If AI is working, show one personalized reaction.
10. Mention optional login/history only if it was actually implemented.

The goal is to make the judges remember:

> "That was the BMI website that takes itself way too seriously."

---

# 31. What NOT to Build

Do not add:
- real financial systems
- payment processing
- medical diagnosis
- calorie prescriptions
- dangerous diet recommendations
- social networking
- full chatbot
- native mobile app
- complex authentication before MVP
- complicated backend
- unnecessary dashboards
- Arduino/hardware unless a later idea genuinely improves the project

---

# 32. Definition of Done

The MVP is complete when a user can:

1. Open the website.
2. Select metric or imperial.
3. Enter valid information.
4. Calculate BMI.
5. See the BMI.
6. See the category.
7. See a funny reaction.
8. Trigger special-number Easter eggs.
9. Hear a sound where appropriate.
10. Mute/unmute sound.
11. Use the website again without refreshing.
12. Use it on a laptop and mobile-sized screen.
13. Continue using it if AI/audio/network features fail.

If all of these work and the UI looks polished, **STOP ADDING FEATURES.**

---

# 33. Antigravity Development Philosophy

The coding agent should behave like a senior frontend engineer helping a beginner finish an event project.

It should:
- inspect the existing project before changing anything
- make small, verifiable changes
- run/build/test frequently
- fix errors instead of hiding them
- avoid unnecessary dependencies
- keep the code readable
- preserve working functionality
- prioritize MVP completion
- explain important decisions briefly
- never silently remove existing features
- never replace working functionality with speculative complexity

Do not attempt to build every stretch goal immediately.

---

# 34. Final Product Personality

The product should feel like:

> **"Someone spent way too much effort making a BMI calculator that absolutely did not need to exist."**

That is the central joke.

It should be technically competent enough that the absurdity feels deliberate.

The goal is not to make the worst website possible.

The goal is to make an **unnecessarily polished website for an unnecessary purpose.**

---

# 35. Assets

The project creator will provide six meme audio files.

One is confirmed:

- 67 meme sound

The other five should be discovered from the supplied project assets when available.

Do not invent filenames or claim an asset exists if it has not been provided.

If an asset is missing, implement a safe fallback.

---

# 36. Future Enhancements

Potential future additions, only after MVP:

- account system
- BMI history
- comparison over time
- more Easter eggs
- more sound packs
- result sharing
- AI-generated variations
- themed result modes
- hidden combinations
- leaderboard for funniest BMI results (only if appropriate and privacy-safe)

These are not part of the initial build requirement.

---

# 37. Success Criteria

A successful submission should satisfy three things:

### It works.
The calculator is reliable.

### It looks good.
The website feels polished and intentional.

### It is memorable.
The meme/reaction system makes people laugh or at least say:

> "Why does this exist?"

That final reaction is the point.
