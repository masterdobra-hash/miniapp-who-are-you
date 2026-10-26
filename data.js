/* Who are you? - content for every language the app speaks.
   Two complete sets: `en` and `ru`. Each one is self-contained and has the
   same shape and the same scoring weights, so an answer index means the
   same thing in both and a duel link works across languages.

   `puzzles` are indexed by day: PUZZLES[dayIndex % puzzles.length]. Both
   sets hold 30 puzzles in the same order. The two that only work with
   English letters/words got a Russian equivalent in place (same slot, the
   answer may sit at a different index - it is the locale's own puzzle).

   Edit the objects below and the site picks the change up on the next load. */

window.WAY_DATA = {
  "defaultLocale": "en",
  "locales": {
    "en": {
      "title": "Who are you?",
      "subtitle": "Five questions. One honest answer. No sign-up, no email, nothing stored beyond your result.",
      "priceStars": 50,
      "archetypes": [
        {
          "id": "architect",
          "name": "The Architect",
          "tagline": "You build the thing everyone else will depend on.",
          "color": "#5B8CFF",
          "glyph": "▚",
          "description": "You don't start with enthusiasm, you start with structure. While others argue about the dream, you quietly work out what it would actually take — the order, the cost, the failure points — and then you build that. People call it discipline. It is really a refusal to let something good stay vague.",
          "strengths": [
            "Turns fog into a plan other people can follow",
            "Sees the failure point three steps before it happens",
            "Keeps quality when everyone else is tired"
          ],
          "weaknesses": [
            "Waits for a plan when action would have taught you faster",
            "Can mistake your structure for the only right structure",
            "Under-reports how much you carry"
          ],
          "compatible": "The Spark",
          "compatible_why": "You build the rails, they make people want to ride. Their chaos gives your structure a reason to exist; your calm keeps their fire from burning the house down.",
          "challenge": "Ship one thing this week before you understand it fully.",
          "share_line": "I'm The Architect. Apparently I build the thing everyone leans on.",
          "compatible_id": "spark"
        },
        {
          "id": "spark",
          "name": "The Spark",
          "tagline": "You start things. Momentum is your native language.",
          "color": "#FF7A3D",
          "glyph": "✦",
          "description": "You move before the room has finished deciding. That is not impatience, it is a different relationship with risk: you would rather learn from a fast mistake than from a slow meeting. People remember the day you arrived because something started that day.",
          "strengths": [
            "Turns a stalled room into motion in minutes",
            "Finds the version of an idea nobody was brave enough to say",
            "Recovers from failure faster than most people recover from criticism"
          ],
          "weaknesses": [
            "Leaves a trail of 80%-finished things behind you",
            "Confuses speed with progress when the work needs depth",
            "Burns hot and then needs a long silence nobody warned you about"
          ],
          "compatible": "The Architect",
          "compatible_why": "They make your fire structural, you make their structure move. Alone, each of you stalls in a predictable way; together the loop closes.",
          "challenge": "Finish one thing to the end this week, even after the excitement is gone.",
          "share_line": "I'm The Spark. Turns out I start things and then start other things.",
          "compatible_id": "architect"
        },
        {
          "id": "mirror",
          "name": "The Mirror",
          "tagline": "You notice what people didn't say out loud.",
          "color": "#6EE7B7",
          "glyph": "◐",
          "description": "You read rooms the way other people read headlines — instantly and accurately. You are the one who notices the person who went quiet, the deal that felt wrong, the truth under the polite version. It makes you trusted, and it makes you tired in a way that is hard to explain.",
          "strengths": [
            "Hears the real question under the asked one",
            "Makes people feel less alone with remarkable economy",
            "Detects a bad situation before there is any evidence"
          ],
          "weaknesses": [
            "Absorbs other people's weather and calls it your own",
            "Avoids saying the hard thing to keep the peace",
            "Mistakes being needed for being wanted"
          ],
          "compatible": "The Ironist",
          "compatible_why": "They say out loud what you only notice. You give their sharpness somewhere soft to land, and they stop you drowning in everyone else's feelings.",
          "challenge": "Say the uncomfortable true thing once this week, plainly, without softening it.",
          "share_line": "I'm The Mirror. I notice the thing you didn't say.",
          "compatible_id": "ironist"
        },
        {
          "id": "guardian",
          "name": "The Guardian",
          "tagline": "You are the reason it didn't fall apart.",
          "color": "#A78BFA",
          "glyph": "◈",
          "description": "You take the boring, load-bearing job and you take it seriously. Not because you lack ambition, but because you understand something most people skip: things survive on maintenance. When the excitement ends, you are still there, and that is a rarer quality than brilliance.",
          "strengths": [
            "Reliable in exactly the moments that decide outcomes",
            "Protects people and standards without needing credit",
            "Says no to the thing that would have cost everything"
          ],
          "weaknesses": [
            "Carries weight silently until it becomes resentment",
            "Confuses safety with staying still",
            "Lets loyalty outrank your own ambition"
          ],
          "compatible": "The Wanderer",
          "compatible_why": "They go out and find what is worth protecting; you make sure it still exists when they come back. You give each other permission the other cannot give themselves.",
          "challenge": "Ask for one thing you have been quietly carrying alone.",
          "share_line": "I'm The Guardian. I'm the reason it didn't fall apart.",
          "compatible_id": "wanderer"
        },
        {
          "id": "wanderer",
          "name": "The Wanderer",
          "tagline": "You need the map to have an edge you haven't reached.",
          "color": "#38BDF8",
          "glyph": "➤",
          "description": "Comfort is the thing that worries you. You are at your best when the next step is not fully known, and you have an unusual tolerance for being a beginner in public. The cost is real: depth is hard when you keep leaving just as a place starts to fit.",
          "strengths": [
            "Learns new territory faster than anyone expects",
            "Unafraid of being visibly bad at something new",
            "Finds opportunities where other people see inconvenience"
          ],
          "weaknesses": [
            "Leaves before compounding starts to pay",
            "Uses novelty as an anaesthetic for something harder",
            "Starts over when staying would have been braver"
          ],
          "compatible": "The Guardian",
          "compatible_why": "They hold the ground so you can go find what is worth holding. Without them your wandering has no home; without you their guarding has nothing new to protect.",
          "challenge": "Pick one thing and stay with it for 90 days past the point of boredom.",
          "share_line": "I'm The Wanderer. I get restless when the map runs out.",
          "compatible_id": "guardian"
        },
        {
          "id": "alchemist",
          "name": "The Alchemist",
          "tagline": "You turn other people's mess into something that works.",
          "color": "#F472B6",
          "glyph": "◍",
          "description": "You are drawn to the broken, the half-finished, the thing everyone quietly gave up on. Where others see a lost cause you see raw material and an interesting constraint. You are less interested in starting from zero than in the specific joy of rescuing something.",
          "strengths": [
            "Finds the working version inside a failed attempt",
            "Comfortable with ambiguity, constraints and no budget",
            "Improves what exists instead of demanding a clean slate"
          ],
          "weaknesses": [
            "Takes on rescues nobody asked you to take on",
            "Values the transformation more than the result",
            "Loses interest once a thing finally works"
          ],
          "compatible": "The Oracle",
          "compatible_why": "They see what a broken thing could become and why; you are the one willing to get your hands in it. Their read plus your hands is an unfair advantage.",
          "challenge": "Finish one rescue and then actually hand it over, instead of starting the next.",
          "share_line": "I'm The Alchemist. Give me your broken thing, I'll make it work.",
          "compatible_id": "oracle"
        },
        {
          "id": "oracle",
          "name": "The Oracle",
          "tagline": "You see the pattern before the evidence arrives.",
          "color": "#FACC15",
          "glyph": "◎",
          "description": "You live one level of abstraction above the conversation. You connect two things that nobody put next to each other and it turns out to be the whole story. The difficulty is that being early looks identical to being wrong, and you have to live with that gap.",
          "strengths": [
            "Predicts outcomes from thin signals with unsettling accuracy",
            "Asks the question that reframes the entire problem",
            "Comfortable being right alone for a while"
          ],
          "weaknesses": [
            "Waits to be asked instead of speaking first",
            "Can be right and useless because nobody was brought along",
            "Retreats into analysis when action is what is needed"
          ],
          "compatible": "The Alchemist",
          "compatible_why": "You see it, they build it. Your insight has been waiting for someone with hands, and their hands have been waiting for someone who knows what it should become.",
          "challenge": "Say your conclusion first and your reasoning second, out loud, this week.",
          "share_line": "I'm The Oracle. I saw this coming and said nothing. Classic me.",
          "compatible_id": "alchemist"
        },
        {
          "id": "ironist",
          "name": "The Ironist",
          "tagline": "You keep the whole thing honest.",
          "color": "#F87171",
          "glyph": "◢",
          "description": "You are the immune system of any group you join. You spot the self-flattering story early and you puncture it, usually with a joke sharp enough to survive. People rely on your honesty more than they admit, and they rarely thank you for it in the moment.",
          "strengths": [
            "Cuts through a room's self-deception in one sentence",
            "Says the thing everyone was avoiding, and survives it",
            "Keeps perspective when everyone else has lost proportion"
          ],
          "weaknesses": [
            "Uses wit as armour when sincerity would land better",
            "Corrects the story instead of helping build one",
            "Mistakes detachment for independence"
          ],
          "compatible": "The Mirror",
          "compatible_why": "They feel what you diagnose. You give their softness a spine, they give your edge a reason to be gentle. Neither of you has to perform for the other.",
          "challenge": "Say one sincere, unhedged thing this week with no joke attached.",
          "share_line": "I'm The Ironist. I'm the one who says the thing. You're welcome.",
          "compatible_id": "mirror"
        }
      ],
      "questions": [
        {
          "id": "q1",
          "text": "It's 11pm and a problem lands on you that nobody else will touch.",
          "options": [
            {
              "text": "Map the whole thing out before I touch anything.",
              "scores": {
                "architect": 2,
                "oracle": 1
              }
            },
            {
              "text": "Start poking at it now, fix fast, clean up later.",
              "scores": {
                "spark": 2,
                "alchemist": 1
              }
            },
            {
              "text": "Message three people and find out what's really going on.",
              "scores": {
                "mirror": 2,
                "oracle": 1
              }
            },
            {
              "text": "Do the smallest safe thing tonight, the real fix tomorrow.",
              "scores": {
                "guardian": 2,
                "wanderer": 1
              }
            }
          ]
        },
        {
          "id": "q2",
          "text": "Your group chat is planning a trip. You are the one who…",
          "options": [
            {
              "text": "Builds the spreadsheet, the budget and the deadline.",
              "scores": {
                "architect": 2,
                "guardian": 1
              }
            },
            {
              "text": "Books the weird thing nobody else would book.",
              "scores": {
                "wanderer": 3,
                "spark": 1
              }
            },
            {
              "text": "Notices two people have gone quiet and pulls them back in.",
              "scores": {
                "mirror": 2,
                "guardian": 1
              }
            },
            {
              "text": "Makes the joke that becomes the trip's name.",
              "scores": {
                "ironist": 2,
                "spark": 1
              }
            }
          ]
        },
        {
          "id": "q3",
          "text": "Someone tells you your idea is impossible. Your honest reaction:",
          "options": [
            {
              "text": "\"Impossible is usually a spec problem.\"",
              "scores": {
                "alchemist": 3,
                "architect": 1
              }
            },
            {
              "text": "\"Good. Then nobody else is doing it.\"",
              "scores": {
                "spark": 2,
                "wanderer": 1
              }
            },
            {
              "text": "\"Let me see the numbers first.\"",
              "scores": {
                "oracle": 2,
                "guardian": 1
              }
            },
            {
              "text": "\"Sure. But look at what it reveals.\"",
              "scores": {
                "ironist": 2,
                "oracle": 1
              }
            }
          ]
        },
        {
          "id": "q4",
          "text": "What drains you fastest?",
          "options": [
            {
              "text": "Noise without a plan.",
              "scores": {
                "architect": 2,
                "guardian": 1
              }
            },
            {
              "text": "Being told to wait.",
              "scores": {
                "wanderer": 3,
                "spark": 1
              }
            },
            {
              "text": "People hiding what they actually feel.",
              "scores": {
                "oracle": 2,
                "mirror": 1
              }
            },
            {
              "text": "Having to pretend everything is fine.",
              "scores": {
                "ironist": 2,
                "mirror": 1
              }
            }
          ]
        },
        {
          "id": "q5",
          "text": "Ten years from now, what would make you say it was worth it?",
          "options": [
            {
              "text": "Something I built is still running without me.",
              "scores": {
                "guardian": 2,
                "architect": 1
              }
            },
            {
              "text": "I turned a mess people gave up on into something that worked.",
              "scores": {
                "alchemist": 3,
                "architect": 1
              }
            },
            {
              "text": "I read a situation right when everyone else was guessing.",
              "scores": {
                "oracle": 2,
                "ironist": 1
              }
            },
            {
              "text": "Nobody could say I sold out what I actually thought.",
              "scores": {
                "ironist": 2,
                "mirror": 1
              }
            }
          ]
        }
      ],
      "puzzles": [
        {
          "id": "p1",
          "prompt": "What comes next: 2, 6, 12, 20, 30, ?",
          "detail": "One number, no calculator needed.",
          "choices": [
            "36",
            "40",
            "42",
            "45"
          ],
          "answer": 2,
          "explain": "Differences grow by 2 each step: +4, +6, +8, +10, so the next is +12 = 42."
        },
        {
          "id": "p2",
          "prompt": "1, 1, 2, 3, 5, 8, ?",
          "detail": "The oldest trick in the book.",
          "choices": [
            "11",
            "12",
            "13",
            "15"
          ],
          "answer": 2,
          "explain": "Each number is the sum of the two before it: 5 + 8 = 13."
        },
        {
          "id": "p3",
          "prompt": "Alex is taller than Ben. Ben is taller than Chris. Who is shortest?",
          "detail": "Read it once, slowly.",
          "choices": [
            "Alex",
            "Ben",
            "Chris",
            "Cannot tell"
          ],
          "answer": 2,
          "explain": "Alex > Ben > Chris, so with only these facts Chris is shortest."
        },
        {
          "id": "p4",
          "prompt": "What comes next: 3, 7, 15, 31, ?",
          "detail": "Double and add one.",
          "choices": [
            "47",
            "55",
            "62",
            "63"
          ],
          "answer": 3,
          "explain": "Each term is 2n + 1: 31 x 2 + 1 = 63."
        },
        {
          "id": "p5",
          "prompt": "Five machines make five widgets in five minutes. How long do 100 machines need for 100 widgets?",
          "detail": "The question everyone gets wrong in a hurry.",
          "choices": [
            "5 minutes",
            "20 minutes",
            "100 minutes",
            "1 minute"
          ],
          "answer": 0,
          "explain": "One machine makes one widget in five minutes, so 100 machines make 100 widgets in the same five minutes."
        },
        {
          "id": "p6",
          "prompt": "A bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. What does the ball cost?",
          "detail": "Not ten cents.",
          "choices": [
            "$0.10",
            "$0.05",
            "$0.01",
            "$0.55"
          ],
          "answer": 1,
          "explain": "Ball x, bat x + 1.00, total 1.10 => 2x = 0.10 => ball is $0.05."
        },
        {
          "id": "p7",
          "prompt": "Which word does not belong: glance, stare, blink, sprint?",
          "detail": "Three of them are about the same thing.",
          "choices": [
            "glance",
            "stare",
            "blink",
            "sprint"
          ],
          "answer": 3,
          "explain": "Glance, stare and blink are all about the eyes. Sprint is about legs."
        },
        {
          "id": "p8",
          "prompt": "2, 3, 5, 7, 11, ?",
          "detail": "No arithmetic needed.",
          "choices": [
            "12",
            "13",
            "14",
            "15"
          ],
          "answer": 1,
          "explain": "The primes: the next one after 11 is 13."
        },
        {
          "id": "p9",
          "prompt": "You own 3 shirts and 2 pairs of trousers. How many different outfits?",
          "detail": "Every shirt with every pair.",
          "choices": [
            "5",
            "6",
            "8",
            "9"
          ],
          "answer": 1,
          "explain": "3 x 2 = 6 combinations."
        },
        {
          "id": "p10",
          "prompt": "Which number is missing: 4, 9, 16, ?, 36",
          "detail": "Look at what those numbers are.",
          "choices": [
            "20",
            "24",
            "25",
            "30"
          ],
          "answer": 2,
          "explain": "Perfect squares: 2², 3², 4², 5², 6² — so 25."
        },
        {
          "id": "p11",
          "prompt": "It is 3:15 on an analog clock. What is the angle between the hands?",
          "detail": "The hour hand is not still.",
          "choices": [
            "0°",
            "7.5°",
            "15°",
            "30°"
          ],
          "answer": 1,
          "explain": "The minute hand is at 90°, the hour hand has moved 7.5° past 3 — the gap is 7.5°."
        },
        {
          "id": "p12",
          "prompt": "A snail climbs 3 metres by day and slips 2 by night. The wall is 10 metres. On which day does it reach the top?",
          "detail": "It does not slip back on the last day.",
          "choices": [
            "Day 8",
            "Day 9",
            "Day 10",
            "Day 12"
          ],
          "answer": 0,
          "explain": "After 7 days it is at 7 m; on day 8 it climbs to 10 m and is done."
        },
        {
          "id": "p13",
          "prompt": "A farmer has 17 sheep. All but 9 run away. How many are left?",
          "detail": "Read the sentence twice.",
          "choices": [
            "8",
            "9",
            "17",
            "0"
          ],
          "answer": 1,
          "explain": "“All but nine” means nine did not run away."
        },
        {
          "id": "p14",
          "prompt": "What comes next: 1, 4, 9, 16, 25, ?",
          "detail": "Perfect squares.",
          "choices": [
            "30",
            "36",
            "42",
            "49"
          ],
          "answer": 1,
          "explain": "1², 2², 3², 4², 5² — next is 6² = 36."
        },
        {
          "id": "p15",
          "prompt": "Five cats catch five mice in five minutes. How many cats catch 100 mice in 100 minutes?",
          "detail": "One cat, one mouse, five minutes.",
          "choices": [
            "5",
            "20",
            "100",
            "1"
          ],
          "answer": 0,
          "explain": "Each cat catches one mouse per five minutes, so one cat gets 20 in 100 minutes and five cats get 100."
        },
        {
          "id": "p16",
          "prompt": "Which is heavier: a kilogram of feathers or a kilogram of iron?",
          "detail": "Look at the unit, not the material.",
          "choices": [
            "The iron",
            "The feathers",
            "They weigh the same",
            "Depends on the weather"
          ],
          "answer": 2,
          "explain": "A kilogram is a kilogram. Only the volume is different."
        },
        {
          "id": "p17",
          "prompt": "How many months of the year have 28 days?",
          "detail": "Every month you have ever lived through.",
          "choices": [
            "1",
            "2",
            "12",
            "6"
          ],
          "answer": 2,
          "explain": "All twelve have at least 28 days."
        },
        {
          "id": "p18",
          "prompt": "Continue the series: A, C, F, J, ?",
          "detail": "Count the jumps: 2, 3, 4 …",
          "choices": [
            "M",
            "N",
            "O",
            "P"
          ],
          "answer": 2,
          "explain": "A(1) +2 = C(3) +3 = F(6) +4 = J(10) +5 = O(15)."
        },
        {
          "id": "p19",
          "prompt": "You are running a race and you overtake the runner in second place. What place are you in?",
          "detail": "You did not overtake the leader.",
          "choices": [
            "First",
            "Second",
            "Third",
            "Last"
          ],
          "answer": 1,
          "explain": "You take the place of the person you passed: second."
        },
        {
          "id": "p20",
          "prompt": "A clock shows exactly 6:00. What is the angle between the two hands?",
          "detail": "Six hours of a twelve-hour face.",
          "choices": [
            "90°",
            "120°",
            "180°",
            "360°"
          ],
          "answer": 2,
          "explain": "Each hour is 30°, so six hours is 180° — a straight line."
        },
        {
          "id": "p21",
          "prompt": "What comes next: 100, 50, 25, 12.5, ?",
          "detail": "Each step is the same change.",
          "choices": [
            "6.25",
            "5",
            "6",
            "10"
          ],
          "answer": 0,
          "explain": "Every term is halved: 12.5 / 2 = 6.25."
        },
        {
          "id": "p22",
          "prompt": "If yesterday was Tuesday, what day is it three days after tomorrow?",
          "detail": "Find today first.",
          "choices": [
            "Friday",
            "Saturday",
            "Sunday",
            "Monday"
          ],
          "answer": 2,
          "explain": "Today is Wednesday, tomorrow is Thursday, three days after that is Sunday."
        },
        {
          "id": "p23",
          "prompt": "Two fathers and two sons go fishing. Each catches one fish and together they bring home three. How?",
          "detail": "Count the people, not the labels.",
          "choices": [
            "One fish escaped",
            "They are three people: grandfather, father, son",
            "They shared one fish",
            "It is impossible"
          ],
          "answer": 1,
          "explain": "The middle person is both a son and a father, so there are only three fishermen."
        },
        {
          "id": "p24",
          "prompt": "Which one does not belong: square, circle, triangle, rectangle?",
          "detail": "Corners and edges.",
          "choices": [
            "Square",
            "Circle",
            "Triangle",
            "Rectangle"
          ],
          "answer": 1,
          "explain": "The circle is the only shape with no straight sides."
        },
        {
          "id": "p25",
          "prompt": "What comes next: 1, 2, 6, 24, 120, ?",
          "detail": "Multiply by 2, then 3, then 4 …",
          "choices": [
            "480",
            "600",
            "720",
            "840"
          ],
          "answer": 2,
          "explain": "1×2, 2×3, 6×4, 24×5 — next is 120×6 = 720."
        },
        {
          "id": "p26",
          "prompt": "A train covers 60 km in 45 minutes. What is its speed in kilometres per hour?",
          "detail": "45 minutes is three quarters of an hour.",
          "choices": [
            "60",
            "75",
            "80",
            "90"
          ],
          "answer": 2,
          "explain": "60 km in 0.75 h is 60 / 0.75 = 80 km/h."
        },
        {
          "id": "p27",
          "prompt": "Rearrange the letters of LISTEN to get a word that means quiet.",
          "detail": "It is one letter away from the word you are reading.",
          "choices": [
            "SILENT",
            "TINSEL",
            "ENLIST",
            "INLETS"
          ],
          "answer": 0,
          "explain": "LISTEN and SILENT are the same seven letters."
        },
        {
          "id": "p28",
          "prompt": "How many times does the digit 9 appear when you write every number from 1 to 100?",
          "detail": "Count the tens and the units separately.",
          "choices": [
            "10",
            "11",
            "19",
            "20"
          ],
          "answer": 2,
          "explain": "Ten in the units (9, 19 … 99) and ten in the tens (90–99), so 20."
        },
        {
          "id": "p29",
          "prompt": "What comes next: 2, 3, 5, 8, 12, ?",
          "detail": "The gaps grow by one each time.",
          "choices": [
            "15",
            "16",
            "17",
            "18"
          ],
          "answer": 2,
          "explain": "Gaps are +1, +2, +3, +4, so the next gap is +5: 12 + 5 = 17."
        },
        {
          "id": "p30",
          "prompt": "A box holds 3 red and 2 blue balls. You take them out blind. How many must you take to be certain of a matching pair?",
          "detail": "Worst case, not best case.",
          "choices": [
            "2",
            "3",
            "4",
            "5"
          ],
          "answer": 1,
          "explain": "With two you could get one of each. The third must match one of them."
        }
      ]
    },
    "ru": {
      "title": "Кто ты?",
      "subtitle": "Пять вопросов. Один честный ответ. Без регистрации, без почты, ничего не хранится на сервере.",
      "priceStars": 50,
      "archetypes": [
        {
          "id": "architect",
          "name": "Архитектор",
          "tagline": "Ты строишь то, на что потом будут опираться все остальные.",
          "color": "#5B8CFF",
          "glyph": "▚",
          "description": "Ты начинаешь не с энтузиазма, а со структуры. Пока остальные спорят о мечте, ты тихо считаешь, что для неё реально нужно: порядок, цена, точки отказа. А потом ты это строишь. Люди называют это дисциплиной. На самом деле это отказ оставлять хорошее дело в тумане.",
          "strengths": [
            "Превращает туман в план, по которому могут идти другие",
            "Видит точку отказа за три шага до неё",
            "Держит качество, когда все уже устали"
          ],
          "weaknesses": [
            "Ждёт плана там, где действие научило бы быстрее",
            "Принимает свою структуру за единственно верную",
            "Недооценивает, сколько на тебе висит"
          ],
          "compatible": "Искра",
          "compatible_why": "Ты прокладываешь рельсы, они делают так, чтобы по ним захотели ехать. Их хаос даёт твоей структуре смысл, твоё спокойствие не даёт их огню сжечь дом.",
          "challenge": "На этой неделе выпусти одну вещь, не разобравшись в ней до конца.",
          "share_line": "Я — Архитектор. Судя по всему, я строю то, на что все опираются.",
          "compatible_id": "spark"
        },
        {
          "id": "spark",
          "name": "Искра",
          "tagline": "Ты начинаешь. Импульс — твой родной язык.",
          "color": "#FF7A3D",
          "glyph": "✦",
          "description": "Ты двигаешься раньше, чем комната успевает договориться. Это не нетерпение, а другие отношения с риском: лучше научиться на быстрой ошибке, чем на медленном совещании. Люди запоминают день, когда ты появился, потому что в этот день что-то началось.",
          "strengths": [
            "За минуты сдвигает застрявшую комнату с места",
            "Находит ту версию идеи, на которую ни у кого не хватило смелости",
            "Восстанавливается после провала быстрее, чем большинство — после критики"
          ],
          "weaknesses": [
            "Оставляет за собой след из вещей, готовых на 80%",
            "Путает скорость с прогрессом, когда работа требует глубины",
            "Горит ярко, а потом требует долгой тишины, о которой никто не предупредил"
          ],
          "compatible": "Архитектор",
          "compatible_why": "Они делают твой огонь конструктивным, ты делаешь их конструкцию живой. По отдельности каждый застревает предсказуемым образом; вместе цикл замыкается.",
          "challenge": "На этой неделе доведи одну вещь до конца — даже когда восторг уже кончился.",
          "share_line": "Я — Искра. Начинаю одно, потом начинаю другое.",
          "compatible_id": "architect"
        },
        {
          "id": "mirror",
          "name": "Зеркало",
          "tagline": "Ты замечаешь то, что не сказали вслух.",
          "color": "#6EE7B7",
          "glyph": "◐",
          "description": "Ты читаешь комнату так, как другие читают заголовки: мгновенно и точно. Ты замечаешь того, кто замолчал, сделку, которая пахнет плохо, правду под вежливой версией. Из-за этого тебе доверяют — и из-за этого ты устаёшь так, что трудно объяснить.",
          "strengths": [
            "Слышит настоящий вопрос под заданным",
            "С удивительной экономией сил даёт людям почувствовать, что они не одни",
            "Чует плохую ситуацию до того, как появились доказательства"
          ],
          "weaknesses": [
            "Впитывает чужую погоду и считает её своей",
            "Не говорит тяжёлое, чтобы сохранить мир",
            "Путает «во мне нуждаются» с «меня хотят»"
          ],
          "compatible": "Ироник",
          "compatible_why": "Они произносят вслух то, что ты только замечаешь. Ты даёшь их резкости место, где можно приземлиться, а они не дают тебе утонуть в чужих чувствах.",
          "challenge": "На этой неделе один раз скажи неудобную правду — прямо, без смягчений.",
          "share_line": "Я — Зеркало. Замечаю то, о чём ты промолчал.",
          "compatible_id": "ironist"
        },
        {
          "id": "guardian",
          "name": "Хранитель",
          "tagline": "Ты — причина, по которой всё не развалилось.",
          "color": "#A78BFA",
          "glyph": "◈",
          "description": "Ты берёшь скучную, несущую работу и относишься к ней серьёзно. Не потому, что тебе не хватает амбиций, а потому, что ты понимаешь то, что большинство пропускает: вещи живут на обслуживании. Когда восторг кончается, ты всё ещё здесь — и это качество встречается реже, чем блеск.",
          "strengths": [
            "Надёжен именно в те моменты, которые решают исход",
            "Защищает людей и стандарты, не требуя признания",
            "Говорит «нет» тому, что стоило бы всего"
          ],
          "weaknesses": [
            "Несёт вес молча, пока это не станет обидой",
            "Путает безопасность с неподвижностью",
            "Позволяет верности быть важнее собственных амбиций"
          ],
          "compatible": "Странник",
          "compatible_why": "Они уходят и находят то, что стоит защищать; ты следишь, чтобы это ещё существовало, когда они вернутся. Вы даёте друг другу разрешение, которого каждый не может дать себе сам.",
          "challenge": "Попроси о том, что давно тянешь в одиночку.",
          "share_line": "Я — Хранитель. Я — причина, по которой всё не развалилось.",
          "compatible_id": "wanderer"
        },
        {
          "id": "wanderer",
          "name": "Странник",
          "tagline": "Тебе нужно, чтобы у карты был край, до которого ты не дошёл.",
          "color": "#38BDF8",
          "glyph": "➤",
          "description": "Тебя беспокоит комфорт. Ты в лучшей форме, когда следующий шаг известен не полностью, и у тебя необычно высокая терпимость к тому, чтобы быть новичком на виду. Цена реальна: глубина плохо даётся, если уходить каждый раз, когда место только начинает подходить.",
          "strengths": [
            "Осваивает новую территорию быстрее, чем кто-либо ожидает",
            "Не боится быть заметно плохим в новом деле",
            "Находит возможности там, где другие видят неудобство"
          ],
          "weaknesses": [
            "Уходит до того, как начинает работать накопление",
            "Использует новизну как обезболивающее от чего-то более трудного",
            "Начинает заново там, где остаться было бы смелее"
          ],
          "compatible": "Хранитель",
          "compatible_why": "Они держат землю, чтобы ты мог искать, что стоит держать. Без них твоим странствиям некуда возвращаться; без тебя их охране нечего защищать нового.",
          "challenge": "Выбери одно дело и останься с ним на 90 дней — начиная с момента, когда станет скучно.",
          "share_line": "Я — Странник. Мне становится неуютно, когда карта заканчивается.",
          "compatible_id": "guardian"
        },
        {
          "id": "alchemist",
          "name": "Алхимик",
          "tagline": "Ты превращаешь чужой бардак в то, что работает.",
          "color": "#F472B6",
          "glyph": "◍",
          "description": "Тебя тянет к сломанному, недоделанному, к тому, от чего все тихо отказались. Там, где другие видят безнадёжное дело, ты видишь сырьё и интересное ограничение. Тебя больше привлекает не начать с нуля, а конкретная радость спасти что-то живое.",
          "strengths": [
            "Находит рабочую версию внутри провалившейся попытки",
            "Спокойно работает с неопределённостью, ограничениями и отсутствием бюджета",
            "Улучшает то, что есть, вместо требования чистого листа"
          ],
          "weaknesses": [
            "Берётся спасать то, о чём никто не просил",
            "Ценит превращение больше результата",
            "Теряет интерес, когда вещь наконец заработала"
          ],
          "compatible": "Оракул",
          "compatible_why": "Они видят, чем сломанное может стать и почему; ты — тот, кто готов запустить в это руки. Их взгляд плюс твои руки — нечестное преимущество.",
          "challenge": "Доведи одно спасение до конца и отдай его — вместо того чтобы начинать следующее.",
          "share_line": "Я — Алхимик. Дай мне сломанную вещь, и она заработает.",
          "compatible_id": "oracle"
        },
        {
          "id": "oracle",
          "name": "Оракул",
          "tagline": "Ты видишь узор раньше, чем появляются доказательства.",
          "color": "#FACC15",
          "glyph": "◎",
          "description": "Ты живёшь на один уровень абстракции выше разговора. Ты соединяешь две вещи, которые никто не ставил рядом, и это оказывается всей историей. Сложность в том, что «рано» выглядит точно так же, как «ошибся», и с этим зазором приходится жить.",
          "strengths": [
            "Предсказывает исход по слабым сигналам с тревожной точностью",
            "Задаёт вопрос, который перестраивает всю задачу",
            "Спокойно переносит то, что какое-то время прав ты один"
          ],
          "weaknesses": [
            "Ждёт, пока спросят, вместо того чтобы сказать первым",
            "Может быть прав и бесполезен, потому что никого не провёл за собой",
            "Уходит в анализ, когда нужно действие"
          ],
          "compatible": "Алхимик",
          "compatible_why": "Ты видишь, они строят. Твоё понимание ждало рук, а их руки ждали того, кто знает, чем это должно стать.",
          "challenge": "На этой неделе говори сначала вывод, а потом обоснование — вслух.",
          "share_line": "Я — Оракул. Я это предвидел и промолчал. Классика.",
          "compatible_id": "alchemist"
        },
        {
          "id": "ironist",
          "name": "Ироник",
          "tagline": "Ты держишь всё это честным.",
          "color": "#F87171",
          "glyph": "◢",
          "description": "Ты — иммунная система любой группы, в которую попадаешь. Ты рано замечаешь историю, которая льстит сама себе, и прокалываешь её — обычно шуткой, достаточно острой, чтобы выжить. На твою честность полагаются больше, чем признают, и благодарят за неё редко и не сразу.",
          "strengths": [
            "Одной фразой пробивает самообман комнаты",
            "Говорит то, чего все избегали, и переживает это",
            "Держит пропорцию, когда остальные её потеряли"
          ],
          "weaknesses": [
            "Использует остроумие как броню там, где лучше бы сработала искренность",
            "Исправляет историю вместо того, чтобы помочь её построить",
            "Путает отстранённость с независимостью"
          ],
          "compatible": "Зеркало",
          "compatible_why": "Они чувствуют то, что ты диагностируешь. Ты даёшь их мягкости хребет, они дают твоей резкости причину быть мягче. Ни одному из вас не нужно играть роль для другого.",
          "challenge": "На этой неделе скажи одну искреннюю вещь без оговорок и без шутки в конце.",
          "share_line": "Я — Ироник. Я тот, кто говорит это вслух. Пожалуйста.",
          "compatible_id": "mirror"
        }
      ],
      "questions": [
        {
          "id": "q1",
          "text": "11 вечера, на тебя сваливается проблема, за которую больше никто не возьмётся.",
          "options": [
            {
              "text": "Сначала разложу всё по схеме, потом трону.",
              "scores": {
                "architect": 2,
                "oracle": 1
              }
            },
            {
              "text": "Начну ковырять сейчас, починю быстро, приберусь потом.",
              "scores": {
                "spark": 2,
                "alchemist": 1
              }
            },
            {
              "text": "Напишу трём людям и выясню, что там на самом деле.",
              "scores": {
                "mirror": 2,
                "oracle": 1
              }
            },
            {
              "text": "Сделаю сегодня самое маленькое и безопасное, настоящее решение — завтра.",
              "scores": {
                "guardian": 2,
                "wanderer": 1
              }
            }
          ]
        },
        {
          "id": "q2",
          "text": "Твой чат планирует поездку. Ты тот, кто…",
          "options": [
            {
              "text": "Делает таблицу, бюджет и дедлайн.",
              "scores": {
                "architect": 2,
                "guardian": 1
              }
            },
            {
              "text": "Бронирует то странное место, куда больше никто не решился.",
              "scores": {
                "wanderer": 3,
                "spark": 1
              }
            },
            {
              "text": "Замечает, что двое замолчали, и возвращает их в разговор.",
              "scores": {
                "mirror": 2,
                "guardian": 1
              }
            },
            {
              "text": "Придумывает шутку, которая становится названием поездки.",
              "scores": {
                "ironist": 2,
                "spark": 1
              }
            }
          ]
        },
        {
          "id": "q3",
          "text": "Тебе говорят, что твоя идея невозможна. Твоя честная реакция:",
          "options": [
            {
              "text": "«Невозможно» — это обычно проблема постановки задачи.",
              "scores": {
                "alchemist": 3,
                "architect": 1
              }
            },
            {
              "text": "Отлично. Значит, больше никто этого не делает.",
              "scores": {
                "spark": 2,
                "wanderer": 1
              }
            },
            {
              "text": "Сначала посмотрю на цифры.",
              "scores": {
                "oracle": 2,
                "guardian": 1
              }
            },
            {
              "text": "«Допустим. Но посмотри, что это вскрывает».",
              "scores": {
                "ironist": 2,
                "oracle": 1
              }
            }
          ]
        },
        {
          "id": "q4",
          "text": "Что высасывает тебя быстрее всего?",
          "options": [
            {
              "text": "Шум без плана.",
              "scores": {
                "architect": 2,
                "guardian": 1
              }
            },
            {
              "text": "Когда говорят «подожди».",
              "scores": {
                "wanderer": 3,
                "spark": 1
              }
            },
            {
              "text": "Люди, которые прячут то, что чувствуют.",
              "scores": {
                "oracle": 2,
                "mirror": 1
              }
            },
            {
              "text": "Необходимость делать вид, что всё нормально.",
              "scores": {
                "ironist": 2,
                "mirror": 1
              }
            }
          ]
        },
        {
          "id": "q5",
          "text": "Через десять лет что заставит тебя сказать, что это было не зря?",
          "options": [
            {
              "text": "Что-то, что я построил, всё ещё работает без меня.",
              "scores": {
                "guardian": 2,
                "architect": 1
              }
            },
            {
              "text": "Я превратил бардак, от которого все отказались, в то, что работает.",
              "scores": {
                "alchemist": 3,
                "architect": 1
              }
            },
            {
              "text": "Я прочитал ситуацию правильно, когда остальные гадали.",
              "scores": {
                "oracle": 2,
                "ironist": 1
              }
            },
            {
              "text": "Никто не мог бы сказать, что я продал то, что на самом деле думаю.",
              "scores": {
                "ironist": 2,
                "mirror": 1
              }
            }
          ]
        }
      ],
      "puzzles": [
        {
          "id": "p1",
          "prompt": "Что дальше: 2, 6, 12, 20, 30, ?",
          "detail": "Одно число, калькулятор не нужен.",
          "choices": [
            "36",
            "40",
            "42",
            "45"
          ],
          "answer": 2,
          "explain": "Разности растут на 2: +4, +6, +8, +10, значит дальше +12 = 42."
        },
        {
          "id": "p2",
          "prompt": "1, 1, 2, 3, 5, 8, ?",
          "detail": "Самый старый трюк на свете.",
          "choices": [
            "11",
            "12",
            "13",
            "15"
          ],
          "answer": 2,
          "explain": "Каждое число — сумма двух предыдущих: 5 + 8 = 13."
        },
        {
          "id": "p3",
          "prompt": "Аня выше Бориса. Борис выше Вани. Кто ниже всех?",
          "detail": "Прочитай один раз, медленно.",
          "choices": [
            "Аня",
            "Борис",
            "Ваня",
            "Нельзя определить"
          ],
          "answer": 2,
          "explain": "Аня > Борис > Ваня, значит по этим данным ниже всех Ваня."
        },
        {
          "id": "p4",
          "prompt": "Что дальше: 3, 7, 15, 31, ?",
          "detail": "Удвой и прибавь один.",
          "choices": [
            "47",
            "55",
            "62",
            "63"
          ],
          "answer": 3,
          "explain": "Каждый член — 2n + 1: 31 × 2 + 1 = 63."
        },
        {
          "id": "p5",
          "prompt": "Пять станков делают пять деталей за пять минут. За сколько минут 100 станков сделают 100 деталей?",
          "detail": "Вопрос, на котором все ошибаются в спешке.",
          "choices": [
            "5 минут",
            "20 минут",
            "100 минут",
            "1 минуту"
          ],
          "answer": 0,
          "explain": "Один станок делает одну деталь за пять минут, значит 100 станков сделают 100 деталей за те же пять минут."
        },
        {
          "id": "p6",
          "prompt": "Ракетка и мяч вместе стоят 110 рублей. Ракетка дороже мяча на 100 рублей. Сколько стоит мяч?",
          "detail": "Не десять рублей.",
          "choices": [
            "10 руб.",
            "5 руб.",
            "1 руб.",
            "55 руб."
          ],
          "answer": 1,
          "explain": "Мяч x, ракетка x + 100, всего 110, значит 2x = 10: мяч стоит 5 рублей."
        },
        {
          "id": "p7",
          "prompt": "Какое слово лишнее: глядеть, смотреть, моргать, бежать?",
          "detail": "Три из них об одном и том же.",
          "choices": [
            "Глядеть",
            "Смотреть",
            "Моргать",
            "Бежать"
          ],
          "answer": 3,
          "explain": "Глядеть, смотреть и моргать — про глаза. Бежать — про ноги."
        },
        {
          "id": "p8",
          "prompt": "2, 3, 5, 7, 11, ?",
          "detail": "Арифметика не нужна.",
          "choices": [
            "12",
            "13",
            "14",
            "15"
          ],
          "answer": 1,
          "explain": "Простые числа: следующее после 11 — 13."
        },
        {
          "id": "p9",
          "prompt": "У тебя 3 рубашки и 2 пары брюк. Сколько разных комплектов можно собрать?",
          "detail": "Каждая рубашка с каждыми брюками.",
          "choices": [
            "5",
            "6",
            "8",
            "9"
          ],
          "answer": 1,
          "explain": "3 × 2 = 6 сочетаний."
        },
        {
          "id": "p10",
          "prompt": "Какое число пропущено: 4, 9, 16, ?, 36",
          "detail": "Посмотри, что это за числа.",
          "choices": [
            "20",
            "24",
            "25",
            "30"
          ],
          "answer": 2,
          "explain": "Полные квадраты: 2², 3², 4², 5², 6² — значит 25."
        },
        {
          "id": "p11",
          "prompt": "На часах ровно 3:15. Какой угол между стрелками?",
          "detail": "Часовая стрелка не стоит на месте.",
          "choices": [
            "0°",
            "7,5°",
            "15°",
            "30°"
          ],
          "answer": 1,
          "explain": "Минутная на 90°, часовая сдвинулась на 7,5° после трёх — разница 7,5°."
        },
        {
          "id": "p12",
          "prompt": "Улитка за день поднимается на 3 метра, за ночь сползает на 2. Стена 10 метров. На какой день она доберётся до верха?",
          "detail": "В последний день она не сползает.",
          "choices": [
            "День 8",
            "День 9",
            "День 10",
            "День 12"
          ],
          "answer": 0,
          "explain": "Через 7 дней она на 7 метрах; на 8-й день поднимается до 10 и всё."
        },
        {
          "id": "p13",
          "prompt": "У фермера 17 овец. Все, кроме 9, убежали. Сколько осталось?",
          "detail": "Прочитай фразу дважды.",
          "choices": [
            "8",
            "9",
            "17",
            "0"
          ],
          "answer": 1,
          "explain": "«Все, кроме девяти» значит девять не убежали."
        },
        {
          "id": "p14",
          "prompt": "Что дальше: 1, 4, 9, 16, 25, ?",
          "detail": "Полные квадраты.",
          "choices": [
            "30",
            "36",
            "42",
            "49"
          ],
          "answer": 1,
          "explain": "1², 2², 3², 4², 5² — дальше 6² = 36."
        },
        {
          "id": "p15",
          "prompt": "Пять кошек ловят пять мышей за пять минут. Сколько кошек поймают 100 мышей за 100 минут?",
          "detail": "Одна кошка, одна мышь, пять минут.",
          "choices": [
            "5",
            "20",
            "100",
            "1"
          ],
          "answer": 0,
          "explain": "Каждая кошка ловит одну мышь за пять минут: одна за 100 минут поймает 20, значит пятерых хватит."
        },
        {
          "id": "p16",
          "prompt": "Что тяжелее: килограмм перьев или килограмм железа?",
          "detail": "Смотри на единицу, а не на материал.",
          "choices": [
            "Железо",
            "Перья",
            "Весят одинаково",
            "Зависит от погоды"
          ],
          "answer": 2,
          "explain": "Килограмм — это килограмм. Различается только объём."
        },
        {
          "id": "p17",
          "prompt": "В скольких месяцах года есть 28 дней?",
          "detail": "Во всех, что ты прожил.",
          "choices": [
            "1",
            "2",
            "12",
            "6"
          ],
          "answer": 2,
          "explain": "Во всех двенадцати есть как минимум 28 дней."
        },
        {
          "id": "p18",
          "prompt": "Продолжи ряд: А, В, Е, И, ?",
          "detail": "Считай буквы алфавита.",
          "choices": [
            "М",
            "Н",
            "О",
            "П"
          ],
          "answer": 1,
          "explain": "А(1) +2 = В(3) +3 = Е(6) +4 = И(10) +5 = Н(15)."
        },
        {
          "id": "p19",
          "prompt": "Ты бежишь забег и обгоняешь второго. Какое место ты занимаешь?",
          "detail": "Ты не обогнал лидера.",
          "choices": [
            "Первое",
            "Второе",
            "Третье",
            "Последнее"
          ],
          "answer": 1,
          "explain": "Ты занимаешь место того, кого обогнал, — второе."
        },
        {
          "id": "p20",
          "prompt": "Часы показывают ровно 6:00. Какой угол между стрелками?",
          "detail": "Шесть часов из двенадцати.",
          "choices": [
            "90°",
            "120°",
            "180°",
            "360°"
          ],
          "answer": 2,
          "explain": "Каждый час — 30°, шесть часов — 180°, прямая линия."
        },
        {
          "id": "p21",
          "prompt": "Что дальше: 100, 50, 25, 12,5, ?",
          "detail": "Каждый шаг — одно и то же изменение.",
          "choices": [
            "6,25",
            "5",
            "6",
            "10"
          ],
          "answer": 0,
          "explain": "Каждый член делится пополам: 12,5 / 2 = 6,25."
        },
        {
          "id": "p22",
          "prompt": "Если вчера был вторник, какой день будет через три дня после завтрашнего?",
          "detail": "Сначала найди сегодня.",
          "choices": [
            "Пятница",
            "Суббота",
            "Воскресенье",
            "Понедельник"
          ],
          "answer": 2,
          "explain": "Сегодня среда, завтра четверг, через три дня — воскресенье."
        },
        {
          "id": "p23",
          "prompt": "Два отца и два сына пошли на рыбалку. Каждый поймал по рыбе, а вместе принесли три. Как?",
          "detail": "Считай людей, а не подписи.",
          "choices": [
            "Одна рыба сбежала",
            "Их трое: дед, отец и сын",
            "Они поделили одну рыбу",
            "Так не бывает"
          ],
          "answer": 1,
          "explain": "Средний — одновременно сын и отец, значит рыбаков было трое."
        },
        {
          "id": "p24",
          "prompt": "Что лишнее: квадрат, круг, треугольник, прямоугольник?",
          "detail": "Углы и стороны.",
          "choices": [
            "Квадрат",
            "Круг",
            "Треугольник",
            "Прямоугольник"
          ],
          "answer": 1,
          "explain": "У круга нет прямых сторон — он единственный такой."
        },
        {
          "id": "p25",
          "prompt": "Что дальше: 1, 2, 6, 24, 120, ?",
          "detail": "Умножай на 2, потом на 3, потом на 4…",
          "choices": [
            "480",
            "600",
            "720",
            "840"
          ],
          "answer": 2,
          "explain": "1×2, 2×3, 6×4, 24×5 — дальше 120×6 = 720."
        },
        {
          "id": "p26",
          "prompt": "Поезд проходит 60 км за 45 минут. Какая у него скорость в километрах в час?",
          "detail": "45 минут — это три четверти часа.",
          "choices": [
            "60",
            "75",
            "80",
            "90"
          ],
          "answer": 2,
          "explain": "60 км за 0,75 часа — это 60 / 0,75 = 80 км/ч."
        },
        {
          "id": "p27",
          "prompt": "Переставь буквы слова КОЛОС — получится название птицы.",
          "detail": "Пять букв, все на месте.",
          "choices": [
            "Сокол",
            "Локос",
            "Сколо",
            "Оскол"
          ],
          "answer": 0,
          "explain": "КОЛОС и СОКОЛ — одни и те же пять букв."
        },
        {
          "id": "p28",
          "prompt": "Сколько раз цифра 9 встретится, если выписать все числа от 1 до 100?",
          "detail": "Считай десятки и единицы отдельно.",
          "choices": [
            "10",
            "11",
            "19",
            "20"
          ],
          "answer": 2,
          "explain": "Десять раз в единицах (9, 19 … 99) и десять в десятках (90–99), итого 20."
        },
        {
          "id": "p29",
          "prompt": "Что дальше: 2, 3, 5, 8, 12, ?",
          "detail": "Промежутки растут на один.",
          "choices": [
            "15",
            "16",
            "17",
            "18"
          ],
          "answer": 2,
          "explain": "Промежутки +1, +2, +3, +4, значит дальше +5: 12 + 5 = 17."
        },
        {
          "id": "p30",
          "prompt": "В коробке 3 красных и 2 синих шара. Ты вынимаешь их не глядя. Сколько надо вынуть, чтобы точно получить пару одного цвета?",
          "detail": "Худший случай, а не лучший.",
          "choices": [
            "2",
            "3",
            "4",
            "5"
          ],
          "answer": 1,
          "explain": "Двух может не хватить — попадутся разные. Третий обязательно совпадёт с одним из них."
        }
      ]
    }
  }
};
