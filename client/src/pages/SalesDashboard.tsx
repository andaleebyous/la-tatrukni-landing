import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Clock3, PackageCheck, RefreshCw, ShieldAlert, Truck, XCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const statusLabels: Record<string, string> = { pending: "جديد", confirmed: "مؤكد", shipped: "تم الشحن", completed: "مكتمل", cancelled: "ملغي" };

export default function SalesDashboard() {
  const { user, loading } = useAuth({ redirectOnUnauthenticated: true, redirectPath: "/sales" });
  const stats = trpc.orders.stats.useQuery(undefined, { enabled: user?.role === "admin" });
  const orders = trpc.orders.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const updateStatus = trpc.orders.updateStatus.useMutation({ onSuccess: () => { void orders.refetch(); void stats.refetch(); } });
  const recentOrders = useMemo(() => orders.data?.slice(0, 30) ?? [], [orders.data]);

  if (loading || !user) return <div className="dashboard-loading">جاري التحقق من صلاحيات لوحة المبيعات…</div>;
  if (user.role !== "admin") return <div className="dashboard-denied"><ShieldAlert size={34} /><h1>هذه الصفحة للمشرفين فقط</h1><p>تواصل مع مالك الموقع لتفعيل صلاحية إدارة المبيعات.</p><Link href="/">العودة للموقع</Link></div>;

  return <main dir="rtl" className="dashboard-page"><header className="dashboard-header"><div><span className="dashboard-kicker">لا تتركني · مركز المبيعات</span><h1>لوحة متابعة الطلبات</h1><p>مرحبًا {user.name ?? "بك"}، هذه نظرة سريعة على طلبات اليوم.</p></div><div className="dashboard-actions"><button onClick={() => { void orders.refetch(); void stats.refetch(); }}><RefreshCw size={16} /> تحديث</button><Link href="/"><ArrowRight size={16} /> الموقع</Link></div></header><section className="dashboard-stats"><div><span className="dashboard-stat-icon stat-purple"><PackageCheck size={19} /></span><small>إجمالي الطلبات</small><strong>{stats.data?.total ?? 0}</strong></div><div><span className="dashboard-stat-icon stat-orange"><Clock3 size={19} /></span><small>بانتظار المتابعة</small><strong>{stats.data?.pending ?? 0}</strong></div><div><span className="dashboard-stat-icon stat-green"><CheckCircle2 size={19} /></span><small>مؤكد / مشحون</small><strong>{stats.data?.confirmed ?? 0}</strong></div><div><span className="dashboard-stat-icon stat-pink"><span>ر.س</span></span><small>قيمة الطلبات</small><strong>{(stats.data?.revenue ?? 0).toLocaleString("ar-SA")}</strong></div></section><section className="orders-panel"><div className="panel-heading"><div><h2>آخر الطلبات</h2><p>حدّث الحالة من القائمة لتبقى المتابعة دقيقة.</p></div><span>{recentOrders.length} طلب</span></div><div className="orders-table-wrap"><table><thead><tr><th>رقم الطلب</th><th>العميل</th><th>الباقة</th><th>المدينة</th><th>التاريخ</th><th>الحالة</th></tr></thead><tbody>{recentOrders.map((order) => <tr key={order.id}><td className="order-id">{order.orderNumber}</td><td><strong>{order.name}</strong><small>{order.phone}</small></td><td>{order.planName}</td><td>{order.city}</td><td>{new Date(order.createdAt).toLocaleDateString("ar-SA")}</td><td><select className={`status-select status-${order.status}`} value={order.status} onChange={(event) => updateStatus.mutate({ id: order.id, status: event.target.value as "pending" | "confirmed" | "shipped" | "completed" | "cancelled" })}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td></tr>)}{recentOrders.length === 0 && <tr><td colSpan={6} className="empty-orders"><Truck size={25} />لا توجد طلبات محفوظة بعد.</td></tr>}</tbody></table></div></section></main>;
}
