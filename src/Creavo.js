import { useState } from "react";

const SAMPLE_ITEMS = [
  { id: 1, type: "beat", title: "Midnight Vibes", artist: "DJ Kxng", price: 9.99, plays: 1240, cover: "🎵", genre: "Hip-Hop", rating: 4.8 },
  { id: 2, type: "art", title: "Neon Dreams", artist: "ArtByZoe", price: 14.99, plays: 890, cover: "🎨", genre: "Digital Art", rating: 4.9 },
  { id: 3, type: "beat", title: "Summer Wave", artist: "ProducerMike", price: 7.99, plays: 2100, cover: "🌊", genre: "Afrobeats", rating: 4.7 },
  { id: 4, type: "art", title: "City Lights", artist: "UrbanSketch", price: 19.99, plays: 560, cover: "🌆", genre: "Illustration", rating: 5.0 },
  { id: 5, type: "beat", title: "Dark Energy", artist: "BeatKing99", price: 12.99, plays: 3300, cover: "⚡", genre: "Trap", rating: 4.6 },
  { id: 6, type: "art", title: "Abstract Soul", artist: "ColorWave", price: 24.99, plays: 430, cover: "🌀", genre: "Abstract", rating: 4.8 },
  { id: 7, type: "beat", title: "Golden Hour", artist: "SunsetBeats", price: 8.99, plays: 1780, cover: "☀️", genre: "R&B", rating: 4.9 },
  { id: 8, type: "art", title: "Pixel Paradise", artist: "PixelArtist", price: 11.99, plays: 670, cover: "🕹️", genre: "Pixel Art", rating: 4.7 },
];

const CATEGORIES = ["All", "Beats", "Art", "Hip-Hop", "Trap", "R&B", "Afrobeats", "Digital Art", "Illustration"];

export default function Creavo() {
  const [screen, setScreen] = useState("home");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [purchased, setPurchased] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = SAMPLE_ITEMS.filter(item => {
    const matchFilter =
      filter === "All" ||
      (filter === "Beats" && item.type === "beat") ||
      (filter === "Art" && item.type === "art") ||
      item.genre === filter;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.artist.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const addToCart = (item) => {
    if (!cart.find(c => c.id === item.id)) {
      setCart([...cart, item]);
      showToast(`"${item.title}" added to cart!`);
    } else {
      showToast("Already in cart!");
    }
  };

  const buyNow = (item) => {
    if (!purchased.find(p => p.id === item.id)) {
      setPurchased([...purchased, item]);
    }
    showToast(`✅ "${item.title}" purchased!`);
    setScreen("home");
  };

  const checkout = () => {
    const newPurchased = cart.filter(c => !purchased.find(p => p.id === c.id));
    setPurchased([...purchased, ...newPurchased]);
    setCart([]);
    setShowCart(false);
    showToast(`✅ ${newPurchased.length} item(s) purchased!`);
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price, 0).toFixed(2);

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "#0a0a0f",
      minHeight: "100vh",
      color: "#fff",
      maxWidth: 420,
      margin: "0 auto",
      position: "relative",
      overflowX: "hidden",
    }}>
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: "#7c3aed", color: "#fff", padding: "10px 22px",
          borderRadius: 30, fontSize: 13, fontWeight: 600, zIndex: 999,
          boxShadow: "0 4px 20px #7c3aed88", whiteSpace: "nowrap"
        }}>{toast}</div>
      )}
      <div style={{
        padding: "20px 20px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: "#a78bfa" }}>Cre</span>avo
          </span>
          <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}>Buy & Sell Creative Work</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {purchased.length > 0 && (
            <button onClick={() => setScreen("library")} style={{
              background: "#1a1a2e", border: "1px solid #333", color: "#a78bfa",
              borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer"
            }}>📁 Library</button>
          )}
          <button onClick={() => setShowCart(!showCart)} style={{
            background: cart.length > 0 ? "#7c3aed" : "#1a1a2e",
            border: "none", color: "#fff", borderRadius: 20,
            padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700
          }}>
            🛒 {cart.length}
          </button>
        </div>
      </div>
      {showCart && (
        <div style={{
          margin: "15px 20px", background: "#13131f", borderRadius: 16,
          border: "1px solid #2a2a3e", padding: 16
        }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Your Cart</div>
          {cart.length === 0 ? (
            <div style={{ color: "#555", fontSize: 13 }}>Cart is empty</div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 10
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{item.cover}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: "#888" }}>{item.artist}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 13 }}>${item.price}</span>
                    <button onClick={() => setCart(cart.filter(c => c.id !== item.id))} style={{
                      background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16
                    }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #2a2a3e", paddingTop: 12, marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ color: "#888", fontSize: 13 }}>Total</span>
                  <span style={{ fontWeight: 800, color: "#a78bfa" }}>${cartTotal}</span>
                </div>
                <button onClick={checkout} style={{
                  width: "100%", background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                  border: "none", color: "#fff", borderRadius: 12,
                  padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer"
                }}>Checkout — ${cartTotal}</button>
              </div>
            </>
          )}
        </div>
      )}
      {screen === "library" && (
        <div style={{ padding: "20px" }}>
          <button onClick={() => setScreen("home")} style={{
            background: "none", border: "none", color: "#a78bfa", cursor: "pointer",
            fontSize: 13, marginBottom: 16, padding: 0
          }}>← Back</button>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>📁 My Library</div>
          {purchased.map(item => (
            <div key={item.id} style={{
              background: "#13131f", borderRadius: 14, padding: 14, marginBottom: 10,
              display: "flex", alignItems: "center", gap: 12,
              border: "1px solid #2a2a3e"
            }}>
              <span style={{ fontSize: 32 }}>{item.cover}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{item.artist} • {item.genre}</div>
              </div>
              <button style={{
                background: "#7c3aed22", border: "1px solid #7c3aed44",
                color: "#a78bfa", borderRadius: 20, padding: "6px 14px",
                fontSize: 12, cursor: "pointer"
              }}>▶ Open</button>
            </div>
          ))}
        </div>
      )}
      {screen === "detail" && selected && (
        <div style={{ padding: "20px" }}>
          <button onClick={() => setScreen("home")} style={{
            background: "none", border: "none", color: "#a78bfa", cursor: "pointer",
            fontSize: 13, marginBottom: 20, padding: 0
          }}>← Back</button>
          <div style={{
            background: "linear-gradient(135deg,#1a0a3e,#0f0f1e)",
            borderRadius: 24, padding: 30, textAlign: "center",
            border: "1px solid #2a2a3e", marginBottom: 20
          }}>
            <div style={{ fontSize: 80, marginBottom: 16 }}>{selected.cover}</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{selected.title}</div>
            <div style={{ color: "#a78bfa", fontSize: 14, marginTop: 4 }}>by {selected.artist}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#a78bfa" }}>{selected.plays.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "#555" }}>plays</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fbbf24" }}>⭐ {selected.rating}</div>
                <div style={{ fontSize: 11, color: "#555" }}>rating</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#34d399" }}>${selected.price}</div>
                <div style={{ fontSize: 11, color: "#555" }}>price</div>
              </div>
            </div>
          </div>
          <div style={{ background: "#13131f", borderRadius: 16, padding: 16, marginBottom: 16, border: "1px solid #2a2a3e" }}>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Genre</div>
            <div style={{ fontWeight: 600 }}>{selected.genre}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => addToCart(selected)} style={{
              flex: 1, background: "#1a1a2e", border: "1px solid #7c3aed",
              color: "#a78bfa", borderRadius: 14, padding: "14px",
              fontWeight: 700, fontSize: 14, cursor: "pointer"
            }}>+ Add to Cart</button>
            <button onClick={() => buyNow(selected)} style={{
              flex: 2, background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
              border: "none", color: "#fff", borderRadius: 14, padding: "14px",
              fontWeight: 700, fontSize: 14, cursor: "pointer"
            }}>Buy Now — ${selected.price}</button>
          </div>
        </div>
      )}
      {screen === "home" && (
        <div style={{ padding: "20px" }}>
          <div style={{
            background: "#13131f", borderRadius: 14, padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 10,
            border: "1px solid #2a2a3e", marginBottom: 20, marginTop: 16
          }}>
            <span style={{ color: "#555" }}>🔍</span>
            <input
              placeholder="Search beats, art, artists..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: "none", border: "none", outline: "none",
                color: "#fff", fontSize: 14, flex: 1
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 20, scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                background: filter === cat ? "#7c3aed" : "#13131f",
                border: filter === cat ? "none" : "1px solid #2a2a3e",
                color: filter === cat ? "#fff" : "#888",
                borderRadius: 20, padding: "6px 14px", fontSize: 12,
                cursor: "pointer", whiteSpace: "nowrap", fontWeight: filter === cat ? 700 : 400
              }}>{cat}</button>
            ))}
          </div>
          <div style={{
            background: "linear-gradient(135deg,#4c1d95,#7c3aed,#2563eb)",
            borderRadius: 20, padding: 20, marginBottom: 24, position: "relative", overflow: "hidden"
          }}>
            <div style={{ fontSize: 11, color: "#c4b5fd", marginBottom: 4, fontWeight: 600, letterSpacing: 1 }}>🔥 TRENDING NOW</div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Top Beats & Art</div>
            <div style={{ fontSize: 12, color: "#c4b5fd", marginTop: 4 }}>Discover fresh talent. Support creators.</div>
            <div style={{ position: "absolute", right: -10, top: -10, fontSize: 80, opacity: 0.15 }}>🎨</div>
          </div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {filtered.map(item => (
              <div key={item.id} onClick={() => { setSelected(item); setScreen("detail"); }} style={{
                background: "#13131f", borderRadius: 16, padding: 14, cursor: "pointer",
                border: "1px solid #1e1e2e", transition: "border-color 0.2s"
              }}>
                <div style={{
                  background: "linear-gradient(135deg,#1a0a3e,#0f0f25)",
                  borderRadius: 12, height: 90, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 42, marginBottom: 10
                }}>{item.cover}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>{item.artist}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#a78bfa", fontWeight: 800, fontSize: 14 }}>${item.price}</span>
                  <span style={{ fontSize: 10, color: "#555" }}>⭐ {item.rating}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 24, background: "#0f0f1e", borderRadius: 16, padding: 18,
            border: "1px dashed #7c3aed66", textAlign: "center"
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🎤</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Are you a creator?</div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>Sell your beats & art. Keep 90% of revenue.</div>
            <button onClick={() => showToast("Seller signup coming soon!")} style={{
              background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
              border: "none", color: "#fff", borderRadius: 20, padding: "10px 24px",
              fontWeight: 700, fontSize: 13, cursor: "pointer"
            }}>Start Selling →</button>
          </div>
          <div style={{ height: 40 }} />
        </div>
      )}
    </div>
  );
    }
