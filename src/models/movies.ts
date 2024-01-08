import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  overview: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  ageRating: { type: String, required: true },
  showTimeIds: [{ type: Schema.Types.ObjectId, ref: 'ShowTime' }]
}, { timestamps: true });

const seatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  isAvailable: { type: Boolean, required: true }
});

const showTimeSchema = new Schema({
  time: { type: String, required: true },
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  seats: [seatSchema],
  audioType: {
    type: String,
    required: true,
    enum: ['Dubbed', 'Subtitled'], 
  },
  screenType: {
    type: String,
    required: true,
    enum: ['2D', '3D'],
  },
  experienceType: {
    type: String,
    required: true,
    enum: ['Standard', 'Platinum'],
  }
});

const daySchema = new Schema({
  weekday: { type: String, required: true },
  date: { type: Date, required: true },
  showTimeIds: [{ type: Schema.Types.ObjectId, ref: 'ShowTime' }]
});

const Movie = mongoose.model('Movie', movieSchema);
const ShowTime = mongoose.model('ShowTime', showTimeSchema);
const Day = mongoose.model('Day', daySchema);

export { Movie, ShowTime, Day, seatSchema };
