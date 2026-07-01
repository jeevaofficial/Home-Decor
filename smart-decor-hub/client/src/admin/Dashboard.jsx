import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService";
import Loader from "../components/Loader";
import { formatPrice } from "../utils/formatPrice";
import {
  Package,
  Layers,
  Inbox,
  FileText,
  ArrowRight,
  TrendingUp,
  ClipboardList,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard | BEST HOME DECORS";
    productService
      .getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullPage />;

  const summaryCards = [
    { title: "Total Products", value: stats?.totalProducts || 0, icon: Package, link: "/admin/products", color: "text-blue-600 bg-blue-50" },
    { title: "Categories", value: stats?.totalCategories || 0, icon: Layers, link: "/admin/categories", color: "text-purple-600 bg-purple-50" },
    { title: "Inquiries", value: stats?.totalInquiries || 0, icon: Inbox, link: "/admin/inquiries", color: "text-amber-600 bg-amber-50" },
    { title: "Quotes", value: stats?.totalQuotes || 0, icon: FileText, link: "/admin/quotes", color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="font-bold text-2xl text-accent-charcoal">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">BEST HOME DECORS — Admin Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl ${card.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <span className="text-xs text-gray-400 block">{card.title}</span>
                <span className="text-2xl font-bold text-accent-charcoal">{card.value}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
          <h3 className="font-bold text-accent-charcoal flex items-center gap-2">
            <TrendingUp size={18} className="text-primary-700" />
            Quote Status
          </h3>
          {["pending", "approved", "rejected"].map((status) => (
            <div key={status} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-gray-500 capitalize">
                <span>{status}</span>
                <span>{stats?.quotesByStatus?.[status] || 0}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    status === "pending" ? "bg-amber-500" : status === "approved" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  style={{
                    width: `${
                      stats?.totalQuotes
                        ? ((stats.quotesByStatus[status] || 0) / stats.totalQuotes) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-accent-charcoal flex items-center gap-2">
              <ClipboardList size={18} className="text-primary-700" />
              Recent Quotes
            </h3>
            <Link to="/admin/quotes" className="text-xs font-semibold text-primary-700 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {stats?.recentQuotes?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider">
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Budget</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats.recentQuotes.map((q) => (
                    <tr key={q._id}>
                      <td className="py-2 font-medium">{q.customerName}</td>
                      <td className="py-2 text-gray-500 max-w-[120px] truncate">{q.product}</td>
                      <td className="py-2 font-bold">{formatPrice(q.amount)}</td>
                      <td className="py-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-50 text-amber-700">
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">No quotes yet.</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-accent-charcoal flex items-center gap-2">
            <Inbox size={18} className="text-primary-700" />
            Recent Inquiries
          </h3>
          <Link to="/admin/inquiries" className="text-xs font-semibold text-primary-700 flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        {stats?.recentInquiries?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.recentInquiries.map((inq) => (
              <div key={inq._id} className="bg-accent-gray p-4 rounded-xl border border-gray-100 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-sm">{inq.name}</span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-primary-700 uppercase">{inq.product}</span>
                <p className="text-gray-500 text-xs line-clamp-2 italic">"{inq.message}"</p>
                <span className="text-[10px] text-gray-400">{inq.phone}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">No inquiries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
