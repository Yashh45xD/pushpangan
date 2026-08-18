import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { MessageSquare, Star, CheckCircle2, XCircle, Trash2, Reply } from "lucide-react";

export const ReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await adminService.getReviews();
      if (res.success && res.reviews) {
        setReviews(res.reviews);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    await adminService.updateReviewStatus(id, status);
    fetchReviews();
  };

  const handleSendReply = async (id: string) => {
    if (!replyText) return;
    await adminService.replyReview(id, replyText);
    setActiveReplyId(null);
    setReplyText("");
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer review?")) return;
    await adminService.deleteReview(id);
    fetchReviews();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-rose-400" /> Customer Reviews Moderation
          </h1>
          <p className="text-xs text-slate-400">
            Approve or reject customer product ratings, post official store replies and monitor floral feedback
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev._id} className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <div className="font-bold text-white text-sm">{rev.userName}</div>
                <div className="text-xs text-rose-400 font-semibold">{rev.flowerName}</div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-300 italic bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
              "{rev.comment}"
            </p>

            {rev.reply && (
              <div className="mt-3 ml-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs">
                <div className="font-bold text-rose-300">Store Manager Reply:</div>
                <div className="text-slate-300 mt-0.5">{rev.reply}</div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                  rev.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : rev.status === "rejected"
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {rev.status}
              </span>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => handleUpdateStatus(rev._id, "approved")}
                  className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateStatus(rev._id, "rejected")}
                  className="px-3 py-1 rounded-xl bg-slate-800 text-rose-400 font-bold hover:bg-rose-500/20 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => setActiveReplyId(rev._id)}
                  className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition"
                >
                  Reply
                </button>
                <button onClick={() => handleDelete(rev._id)} className="p-1.5 text-slate-500 hover:text-rose-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {activeReplyId === rev._id && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official admin response..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                />
                <button
                  onClick={() => handleSendReply(rev._id)}
                  className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-xl text-xs"
                >
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
