"use client";
import React from "react";

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen text-foreground py-40 md:py-60 px-6">
       <div className="max-w-[1200px] mx-auto flex flex-col gap-32">
          
          <div className="flex flex-col gap-10">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/20">Studio Support // Digital Desk</span>
             <h1 className="text-7xl md:text-[12rem] font-bold uppercase tracking-tighter leading-[0.8]">Get in<br/>System</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
             <div className="flex flex-col gap-20">
                <div className="flex flex-col gap-6">
                   <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/30 underline decoration-dotted underline-offset-4">General Inquiries</span>
                   <p className="text-3xl font-bold uppercase tracking-tighter">systems@denimx.com</p>
                </div>
                <div className="flex flex-col gap-6">
                   <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/30 underline decoration-dotted underline-offset-4">Studio Location</span>
                   <p className="text-xs font-bold uppercase tracking-[0.2em] leading-loose text-foreground/60 max-w-xs">GROUND ZERO STUDIOS.<br/>ARCHITECTURAL DISTRICT 09.<br/>TOKYO, JAPAN.</p>
                </div>
                <div className="flex flex-col gap-4 pt-10 border-t border-accent">
                   <span className="text-[8px] font-black uppercase text-foreground/20">OPERATING HOURS (UTC+9)</span>
                   <p className="text-[10px] font-black uppercase">09:00 — 18:00 DAILY</p>
                </div>
             </div>

             <div className="flex flex-col gap-10 bg-accent p-10 md:p-20 shadow-2xl">
                <div className="flex flex-col gap-4">
                   <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Communication Form</span>
                   <div className="w-20 h-[1px] bg-foreground/20" />
                </div>
                
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData);
                    
                    try {
                      const res = await fetch('/api/contact', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' }
                      });
                      if (res.ok) alert("TRANSMISSION SUCCESSFUL. WE WILL RESPOND VIA DATA FEED.");
                    } catch (err) {
                      alert("TRANSMISSION FAILED. CHECK SYSTEM CONNECTION.");
                    }
                  }}
                  className="flex flex-col gap-10"
                >
                   <div className="flex flex-col gap-2">
                      <label className="text-[8px] font-black uppercase text-foreground/30">Identifier</label>
                      <input name="name" required type="text" placeholder="FULL NAME//" className="bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-foreground transition-all uppercase text-[10px] font-bold tracking-widest" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-[8px] font-black uppercase text-foreground/30">Data Origin</label>
                      <input name="email" required type="email" placeholder="EMAIL ADDRESS//" className="bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-foreground transition-all uppercase text-[10px] font-bold tracking-widest" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-[8px] font-black uppercase text-foreground/30">Message Payload</label>
                      <textarea name="message" required rows={4} placeholder="TYPE YOUR MESSAGE//" className="bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-foreground transition-all uppercase text-[10px] font-bold tracking-widest resize-none" />
                   </div>
                   <button type="submit" className="btn-luxury w-full py-6 mt-6">Secure Transmission</button>
                </form>
             </div>

          </div>

       </div>
    </main>
  );
}
