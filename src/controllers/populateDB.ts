import { Request, Response } from "express";
import { Movie, ShowTime, Day } from "../models/movies";

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateSeats(): { number: string; isAvailable: boolean; }[] {
  let seats = [];
  for (let i = 1; i <= 20; i++) {
    seats.push({
      number: `Seat ${i}`,
      isAvailable: Math.random() > 0.5
    });
  }
  return seats;
}

export async function populateDB(req: Request, res: Response) {
  try {
    const moviesArray = [
        {
          title: "Mulan",
          image: "path/to/journey_through_space.jpg",
          overview: "Explore the vastness of space in this thrilling adventure.",
          ageRating: "10",
        },
        {
          title: "Mystery of the Deep",
          image: "path/to/mystery_of_the_deep.jpg",
          overview: "Dive into the depths of the ocean to uncover hidden secrets.",
          ageRating: "12",
        },
        {
          title: "Stars of Destiny",
          image: "path/to/stars_of_destiny.jpg",
          overview: "Journey across the galaxy to fulfill an ancient prophecy.",
          ageRating: "10",
        },
        {
          title: "Hidden Valleys",
          image: "path/to/hidden_valleys.jpg",
          overview: "Discover the secrets lying in the serene valleys of an untouched land.",
          ageRating: "12",
        },
        {
          title: "Silent Echoes",
          image: "path/to/silent_echoes.jpg",
          overview: "Listen to the silent whispers of the past in this gripping drama.",
          ageRating: "10",
        },
        {
          title: "Frozen Time",
          image: "path/to/frozen_time.jpg",
          overview: "Unravel the mystery when time stands still in a frozen world.",
          ageRating: "12",
        },
        {
          title: "Whispers of the Forest",
          image: "path/to/whispers_of_the_forest.jpg",
          overview: "Venture into the heart of the forest where the trees tell old tales.",
          ageRating: "10",
        },
        {
          title: "Beyond the Horizon",
          image: "path/to/beyond_the_horizon.jpg",
          overview: "Sail to the ends of the earth and discover what lies beyond the horizon.",
          ageRating: "12",
        },
        {
          title: "Shadow Realm",
          image: "path/to/shadow_realm.jpg",
          overview: "Step into a realm where shadows come to life and darkness reigns.",
          ageRating: "10",
        },
        {
          title: "Echoes of Tomorrow",
          image: "path/to/echoes_of_tomorrow.jpg",
          overview: "Face the future and the echoes of tomorrow in this sci-fi adventure.",
          ageRating: "12",
        },
        {
          title: "Lost Kingdoms",
          image: "path/to/lost_kingdoms.jpg",
          overview: "Embark on a quest to discover kingdoms lost to time.",
          ageRating: "10",
        },
        {
          title: "Ocean's Whisper",
          image: "path/to/oceans_whisper.jpg",
          overview: "Dive deep into the ocean's heart and hear its ancient whispers.",
          ageRating: "12",
        },
        {
          title: "Sands of Time",
          image: "path/to/sands_of_time.jpg",
          overview: "Travel through time in the mystical sands of an ancient desert.",
          ageRating: "10",
        },
        {
          title: "Mystic Mountains",
          image: "path/to/mystic_mountains.jpg",
          overview: "Climb the mystic mountains where legends are born.",
          ageRating: "12",
        },
        {
          title: "Skyward Bound",
          image: "path/to/skyward_bound.jpg",
          overview: "Soar above the clouds and discover what it means to be skyward bound.",
          ageRating: "10",
        },
        {
          title: "Ancient Echoes",
          image: "path/to/ancient_echoes.jpg",
          overview: "Uncover the echoes of a civilization long gone in this archaeological adventure.",
          ageRating: "12",
        },
        {
          title: "Guardians of Light",
          image: "path/to/guardians_of_light.jpg",
          overview: "Protect the realm of light from the encroaching shadows.",
          ageRating: "10",
        },
        {
          title: "Nightfall",
          image: "path/to/nightfall.jpg",
          overview: "Survive the terrors that lurk in the shadows after nightfall.",
          ageRating: "12",
        },
        {
          title: "Infinite Journey",
          image: "path/to/infinite_journey.jpg",
          overview: "Embark on an endless adventure where every choice leads to a new path.",
          ageRating: "10",
        },
        {
          title: "Realm of Dreams",
          image: "path/to/realm_of_dreams.jpg",
          overview: "Explore the ethereal realm of dreams in this surreal adventure.",
          ageRating: "12",
        }
      ]
      

    const audioTypes = ['Dubbed', 'Subtitled'];
    const screenTypes = ['2D', '3D'];
    const experienceTypes = ['Standard', 'Platinum'];
    const movieTimes = ['19:00', '21:00'];

    for (const movieData of moviesArray) {
      const movie = new Movie({
        ...movieData,
        releaseDate: new Date(),
      });
      await movie.save();

      for (let d = 0; d < 30; d++) {
        const day = new Day({
          weekday: new Date().toLocaleString('en-us', { weekday: 'long' }),
          date: new Date(new Date().setDate(new Date().getDate() + d))
        });

        for (let t = 0; t < 2; t++) {
          const showTime = new ShowTime({
            time: movieTimes[t],
            movieId: movie._id,
            seats: generateSeats(),
            audioType: getRandomElement(audioTypes),
            screenType: getRandomElement(screenTypes),
            experienceType: getRandomElement(experienceTypes)
          });
          await showTime.save();
          day.showTimeIds.push(showTime._id);
        }
        await day.save();
      }
    }
    res.status(200).send('Database populated successfully!');
  } catch (error) {
    res.status(500).send('Error populating database');
  }
}

export async function clearOldSessions() {
  try {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    await Day.deleteMany({ date: { $lt: yesterday } });
  } catch (error) {
    console.error('Error clearing old sessions', error);
  }
}
