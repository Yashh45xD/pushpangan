import mongoose from "mongoose";

const rewardPointsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    available: { type: Number, default: 0 },
    lifetime: { type: Number, default: 0 },
    level: { type: String, enum: ["Bronze", "Silver", "Gold", "Platinum"], default: "Bronze" },
    history: [
      {
        action: { type: String },
        points: { type: Number },
        description: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const RewardPoints = mongoose.model("RewardPoints", rewardPointsSchema);
