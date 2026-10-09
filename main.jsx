import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowRight, BadgeCheck, BarChart3, Check, ChevronDown,
  CircleHelp, Clock3, Instagram, LayoutDashboard, LogIn, Menu,
  PackageCheck, ShieldCheck, Sparkles, TrendingUp, Users, X
} from "lucide-react";
import "./style.css";

const services = [
  { id: "audit", category: "Strategy", name: "Instagram Profile Audit", detail: "A practical review of bio, profile clarity, and content positioning.", price: "Free demo", turnaround: "1–2 days", tag: "Starter" },
  { id: "content", category: "Content", name: "Reels Content Plan", detail: "A 7-day content calendar with hooks, topics, and calls to action.", price: "From ₹199", turnaround: "2 days", tag: "Popular" },
  { id: "captions", category: "Content", name: "Caption & Hashtag Research", detail: "Relevant caption ideas and niche-focused hashtag research.", price: "From ₹149", turnaround: "1–2 days", tag: "Creator" },
  { id: "report", category: "Analytics", name: "Growth Insights Report", detail: "A manual review of your available insights and next-step recommendations.", price: "From ₹249", turnaround: "2–3 days", tag: "Insights" }
];

function App() {
  const [active, setActive] = useState("Services");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedService, setSelectedService] = useState("content");
  const [customerEmail, setCustomerEmail] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [orderId, setOrderId] = useState("");
  const [lookupId, setLookupId] = useState("");
  const [notice, setNotice] = useState("");
  const [orders, setOrders] = useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  const categories = ["All", ...new Set(services.map(s => s.category))];
  const visibleServices = useMemo(() => filter === "All" ? services : services.filter(s => s.category === filter), [filter]);
  const service = services.find(s => s.id === selectedService) || services[1];

  function go(section) {
    setActive(section);
    setMobileMenu(false);
    setNotice("");
    document.getElementById(section.toLowerCase().replaceAll(" ", "-"))?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitOrder(e) {
    e.preventDefault();
    if (!customerEmail.trim() || !instagramUrl.trim()) {
      setNotice("Please enter your email and Instagram profile URL.");
      return;
    }
    try {
      const parsed = new URL(instagramUrl);
      if (!["instagram.com", "www.instagram.com"].includes(parsed.hostname)) {
        setNotice("Please enter a valid instagram.com profile URL.");
        return;
      }
    } catch {
      setNotice("Please enter a valid Instagram profile URL (https://www.instagram.com/yourname/).");
      return;
    }
    const id = "DVS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const newOrder = {
      id, serviceId: selectedService, serviceName: service.name,
      email: customerEmail.trim(), instagramUrl: instagramUrl.trim(),
      notes: notes.trim(), status: "Received (demo)", createdAt: new Date().toLocaleString()
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    setOrderId(id);
    setLookupId(id);
    setNotice("Demo order created. This starter saves orders only in this browser; no service has been purchased or delivered.");
    setNotes("");
    setActive("Order Tracking");
  }

  function trackOrder(e) {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === lookupId.trim().toLowerCase());
    setNotice(found ? `Order ${found.id}: ${found.status}. Service: ${found.serviceName}.` : "Order not found in this browser demo. Production tracking needs a secure database.");
  }

  function signIn(e) {
    e.preventDefault();
    if (!loginEmail.trim()) return setNotice("Enter an email address to preview customer login.");
    setIsLoggedIn(true);
    setNotice("Demo sign-in only. This is not secure authentication and does not create a real account.");
  }

  function adminSignIn(e) {
    e.preventDefault();
    if (adminKey === "demo-admin") {
      setAdminMode(true);
      setNotice("Demo admin view unlocked. Change/remove this demo key before any public deployment.");
    } else {
      setNotice("Demo key incorrect. For this local preview only, use demo-admin.");
    }
  }

  const nav = ["Services", "Place Order", "Order Tracking", "Customer Login", "Admin Dashboard"];

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => setActive("Services")}>
          <span className="brand-mark"><Activity size={21}/></span>
          <span>DEVESH <b>SMM</b><small>GROW WITH PURPOSE</small></span>
        </a>
        <button className="mobile-toggle" onClick={() => setMobileMenu(v => !v)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          {nav.map(item => <button key={item} className={active === item ? "nav-link active" : "nav-link"} onClick={() => go(item)}>{item}</button>)}
        </nav>
        <button className="top-cta" onClick={() => go("Place Order")}>Get started <ArrowRight size={16}/></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot"/> CREATOR GROWTH, DONE RIGHT</div>
            <h1>Build a stronger<br/>Instagram <span>presence.</span></h1>
            <p className="hero-text">Practical content strategy, profile improvements, and insights that help you grow an authentic audience — without bots or fake engagement.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => go("Services")}>Explore services <ArrowRight size={17}/></button>
              <button className="btn-quiet" onClick={() => go("Order Tracking")}>Track an order</button>
            </div>
            <div className="trust-row"><span><ShieldCheck size={16}/> No password needed</span><span><BadgeCheck size={16}/> Real strategy</span></div>
          </div>
          <div className="hero-visual">
            <div className="glow glow-one"/><div className="glow glow-two"/>
            <div className="dashboard-card">
              <div className="dash-head"><div><span className="muted-label">YOUR GROWTH WORKSPACE</span><h3>Creator overview</h3></div><span className="icon-tile"><TrendingUp size={20}/></span></div>
              <div className="metric-grid">
                <div className="metric"><span>Content consistency</span><strong>+<em>28%</em></strong><small>Illustrative demo metric</small></div>
                <div className="metric"><span>Profile clarity</span><strong><em>Good</em></strong><small>Sample status</small></div>
              </div>
              <div className="chart-title"><span>Weekly content plan</span><span className="chart-badge">DEMO</span></div>
              <div className="bars" aria-label="Illustrative weekly content chart">{[34,50,43,69,55,82,72,94,68,78,59,88].map((h,i)=><span key={i} style={{height:`${h}%`}}/>)}</div>
              <div className="chart-foot"><span><i className="legend-dot"/> Planning activity</span><span>Example data only</span></div>
            </div>
            <div className="float-chip"><span className="chip-icon"><Sparkles size={17}/></span><div><b>Authentic growth</b><small>Strategy over shortcuts</small></div><Check size={17} className="chip-check"/></div>
          </div>
          <div className="hero-bottom"><span>BUILT FOR CREATORS & SMALL BUSINESSES</span><span>STRATEGY · CONTENT · INSIGHTS</span></div>
        </section>

        <section className="section" id="services">
          <div className="section-heading"><div><div className="eyebrow">WHAT WE OFFER</div><h2>Simple services. <span>Real value.</span></h2></div><p>No follower guarantees. Just useful tools and services to help improve your content and understand your audience.</p></div>
          <div className="filter-row">{categories.map(c=><button key={c} className={filter===c?"filter active":"filter"} onClick={()=>setFilter(c)}>{c}</button>)}</div>
          <div className="service-grid">
            {visibleServices.map((s,i)=><article className="service-card" key={s.id}>
              <div className="service-top"><span className="service-icon">{i%3===0?<Users size={21}/>:i%3===1?<Sparkles size={21}/>:<BarChart3 size={21}/>}</span><span className="service-tag">{s.tag}</span></div>
              <p className="service-category">{s.category}</p><h3>{s.name}</h3><p className="service-desc">{s.detail}</p>
              <div className="service-meta"><span><Clock3 size={14}/>{s.turnaround}</span><strong>{s.price}</strong></div>
              <button className="service-select" onClick={()=>{setSelectedService(s.id);go("Place Order")}}>Choose service <ArrowRight size={16}/></button>
            </article>)}
          </div>
          <p className="small-note"><CircleHelp size={15}/> Prices are sample placeholders. Replace them with your real prices and service terms before launch.</p>
        </section>

        <section className="section order-section" id="place-order">
          <div className="section-heading"><div><div className="eyebrow">START HERE</div><h2>Place a <span>new order.</span></h2></div><p>Request a legitimate service. We never ask for your Instagram password.</p></div>
          <div className="two-col">
            <form className="panel form-panel" onSubmit={submitOrder}>
              <div className="panel-heading"><span className="panel-icon"><PackageCheck size={20}/></span><div><h3>Order details</h3><p>Fields marked * are required.</p></div></div>
              <label>Choose a service *</label>
              <div className="select-wrap"><select value={selectedService} onChange={e=>setSelectedService(e.target.value)}>{services.map(s=><option value={s.id} key={s.id}>{s.name} — {s.price}</option>)}</select><ChevronDown size={16}/></div>
              <label>Email address *</label><input type="email" placeholder="you@example.com" value={customerEmail} onChange={e=>setCustomerEmail(e.target.value)} required/>
              <label>Instagram profile URL *</label><input type="url" placeholder="https://www.instagram.com/yourname/" value={instagramUrl} onChange={e=>setInstagramUrl(e.target.value)} required/>
              <label>Notes <span className="optional">(optional)</span></label><textarea rows="3" placeholder="Tell us your niche, goals, or content needs…" value={notes} onChange={e=>setNotes(e.target.value)}/>
              <div className="privacy-hint"><ShieldCheck size={17}/><span>Never enter your password, login code, or recovery details.</span></div>
              <button className="btn-primary full" type="submit">Create demo order <ArrowRight size={17}/></button>
              {notice && <p className="notice" role="status">{notice}</p>}
              {orderId && <p className="order-confirm">Demo order ID: <b>{orderId}</b> — save it to test tracking.</p>}
            </form>
            <div className="order-side">
              <div className="panel selected-panel"><span className="muted-label">SELECTED SERVICE</span><span className="big-service-icon"><Instagram size={25}/></span><h3>{service.name}</h3><p>{service.detail}</p><div className="selected-bottom"><span>{service.turnaround}</span><strong>{service.price}</strong></div></div>
              <div className="info-card"><ShieldCheck size={21}/><div><b>Privacy first</b><p>Only share a public profile URL. Never provide your Instagram password or one-time codes.</p></div></div>
              <div className="info-card"><BadgeCheck size={21}/><div><b>Honest expectations</b><p>Results vary. We do not promise specific follower counts or guaranteed reach.</p></div></div>
            </div>
          </div>
        </section>

        <section className="section tracking-section" id="order-tracking">
          <div className="section-heading"><div><div className="eyebrow">ORDER STATUS</div><h2>Track your <span>request.</span></h2></div><p>Look up demo orders created in this browser. A real multi-device tracker needs a backend.</p></div>
          <form className="track-box" onSubmit={trackOrder}><span className="track-icon"><PackageCheck size={22}/></span><div className="track-input"><label htmlFor="trackId">Order ID</label><input id="trackId" placeholder="e.g. DVS-A1B2C3" value={lookupId} onChange={e=>setLookupId(e.target.value)} required/></div><button className="btn-primary" type="submit">Track order <ArrowRight size={16}/></button></form>
          {notice && active==="Order Tracking" && <div className="notice tracking-notice" role="status">{notice}</div>}
          <div className="status-steps">{["Received","Review","In progress","Completed"].map((s,i)=><div className="status-step" key={s}><span className={i===0?"step-num current":"step-num"}>{i+1}</span><div><b>{s}</b><small>{i===0?"Request recorded":i===1?"Manual review":i===2?"Service work":"Delivery update"}</small></div></div>)}</div>
        </section>

        <section className="section account-section" id="customer-login">
          <div className="section-heading"><div><div className="eyebrow">YOUR ACCOUNT</div><h2>Customer <span>login.</span></h2></div><p>Demo-only login preview. Add a secure authentication provider before using real customer accounts.</p></div>
          <form className="panel compact-form" onSubmit={signIn}><span className="panel-icon"><LogIn size={20}/></span><h3>{isLoggedIn?"Demo account preview":"Welcome back"}</h3><p>{isLoggedIn?`Signed in locally as ${loginEmail}.`:"Enter an email to preview the login flow."}</p><label>Email address</label><input type="email" placeholder="you@example.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} required/><button className="btn-primary full" type="submit">{isLoggedIn?"Refresh demo session":"Continue with email"} <ArrowRight size={16}/></button><small className="form-disclaimer">No password is collected. This is not real authentication.</small></form>
        </section>

        <section className="section admin-section" id="admin-dashboard">
          <div className="section-heading"><div><div className="eyebrow">MANAGE REQUESTS</div><h2>Admin <span>dashboard.</span></h2></div><p>A local preview of the order list. Secure admin access and database storage are not configured.</p></div>
          {!adminMode ? <form className="panel compact-form" onSubmit={adminSignIn}><span className="panel-icon"><LayoutDashboard size={20}/></span><h3>Admin access (demo)</h3><label>Demo key</label><input type="password" placeholder="Enter demo key" value={adminKey} onChange={e=>setAdminKey(e.target.value)} required/><button className="btn-primary full" type="submit">Open dashboard <ArrowRight size={16}/></button><small className="form-disclaimer">Local preview key: <code>demo-admin</code>. Not secure; never use this for production.</small></form> : <div className="panel admin-table"><div className="admin-stats"><div><small>Total demo orders</small><strong>{orders.length}</strong></div><div><small>Received</small><strong>{orders.length}</strong></div><div><small>Delivered</small><strong>0</strong></div></div>{orders.length===0?<p className="empty-state">No demo orders yet. Submit the order form to see one here.</p>:<div className="table-scroll"><table><thead><tr><th>Order ID</th><th>Service</th><th>Email</th><th>Status</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td>{o.id}</td><td>{o.serviceName}</td><td>{o.email}</td><td><span className="status-pill">{o.status}</span></td></tr>)}</tbody></table></div>}<button className="btn-quiet" onClick={()=>setAdminMode(false)}>Close dashboard</button></div>}
        </section>

        <section className="final-cta"><div className="cta-icon"><TrendingUp size={23}/></div><div><h2>Make every post count.</h2><p>Start with a clear strategy and build a community that actually cares.</p></div><button className="btn-primary" onClick={()=>go("Place Order")}>Start an order <ArrowRight size={17}/></button></section>
      </main>
      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><Activity size={18}/></span><span>DEVESH <b>SMM</b><small>GROW WITH PURPOSE</small></span></a><p>Independent creator-growth services. Not affiliated with Instagram or Meta.</p><span className="copyright">© {new Date().getFullYear()} Devesh SMM · Starter demo</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
