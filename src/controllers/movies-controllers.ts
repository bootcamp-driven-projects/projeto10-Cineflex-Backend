import { Request, Response } from "express";
import { Day } from "@/models/movies";
import dayjs from "dayjs";

interface PopulatedShowTime {
  _id: string;
  time: string;
  movieId: {
    _id: string;
    title: string;
    image: string;
    overview: string;
    releaseDate: Date;
    ageRating: string;
  };
  seats: {
    number: string;
    isAvailable: boolean;
  }[];
  audioType: 'Dubbed' | 'Subtitled';
  screenType: '2D' | '3D';
  experienceType: 'Standard' | 'Platinum';
}

interface PopulatedDay {
  date: number;
  weekday: string;
  showTimeIds: PopulatedShowTime[];
}

const moviesControllers = {
  listbydate: async (req: Request, res: Response) => {
    try {
      const dateString = req.query.date ? req.query.date.toString() : dayjs().format('YYYY-MM-DD');
      const startOfDay = dayjs(dateString).startOf('day').valueOf(); 
      const endOfDay = dayjs(dateString).endOf('day').valueOf(); 

      const days = await Day.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }).populate({
        path: 'showTimeIds',
        populate: {
          path: 'movieId',
          model: 'Movie'
        }
      });

      if (!days.length) {
        return res.status(404).send({ message: "No movies found for this date" });
      }

      const populatedDays: PopulatedDay[] = days as unknown as PopulatedDay[];

      const moviesDetails = populatedDays.map(day => ({
        date: dayjs(day.date).format('YYYY-MM-DD'),  
        weekday: day.weekday,
        showtimes: day.showTimeIds.map(showtime => ({
          time: showtime.time,
          movie: {
            title: showtime.movieId.title,
            image: showtime.movieId.image,
            overview: showtime.movieId.overview,
            releaseDate: dayjs(showtime.movieId.releaseDate).format('YYYY-MM-DD'),
            ageRating: showtime.movieId.ageRating
          },
          audioType: showtime.audioType,
          screenType: showtime.screenType,
          experienceType: showtime.experienceType,
          seatsAvailable: showtime.seats.filter(seat => seat.isAvailable).length
        }))
      }));

      res.status(200).send(moviesDetails);
    } catch (error) {
      console.error("Error fetching movies by date:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};

export default moviesControllers;
