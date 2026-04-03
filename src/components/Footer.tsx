"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-20 px-6 md:px-20 border-t border-black/5 font-sans relative z-10">
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">LUVRA Archive</h2>
                            <p className="text-[10px] font-bold text-zinc-400 tracking-[0.3em] uppercase">Sector: Radha Enterprises</p>
                        </div>
                        <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest leading-relaxed max-w-[280px]">
                            Engineering architectural luxury denim for the modern vanguard. Archival research since MMXXIV.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-8">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] border-b border-black/5 pb-4 w-fit">Navigation Matrix</h3>
                        <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                            <li><Link href="/" className="hover:text-black transition-colors">Home Archive</Link></li>
                            <li><Link href="/mens-archive" className="hover:text-black transition-colors">Mens Sector</Link></li>
                            <li><Link href="/womens-archive" className="hover:text-black transition-colors">Womens Sector</Link></li>
                            <li><Link href="/archive" className="hover:text-black transition-colors">All Pieces</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal (Crucial for Whitelisting) */}
                    <div className="space-y-8">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] border-b border-black/5 pb-4 w-fit">Support Protocol</h3>
                        <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact Verification</Link></li>
                            <li><Link href="/shipping-policy" className="hover:text-black transition-colors">Shipping Logistics</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-black transition-colors">Refund & Return Policy</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy Encryption</Link></li>
                            <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div className="space-y-8">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] border-b border-black/5 pb-4 w-fit">Communication Link</h3>
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-zinc-400 tracking-[0.1em] leading-relaxed uppercase">
                                +91 9123456789<br/>RADHA ENTERPRISES (HQ NEW DELHI)
                            </p>
                            <div className="flex gap-6 pt-4 grayscale opacity-40">
                                <span className="text-[10px] font-black border border-black/10 px-3 py-1">TW</span>
                                <span className="text-[10px] font-black border border-black/10 px-3 py-1">IG</span>
                                <span className="text-[10px] font-black border border-black/10 px-3 py-1">FB</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 pt-10 border-t border-black/5 flex flex-col md:row items-center justify-between gap-8 md:gap-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 text-center">
                        © MMXXIV LUVRA ARCHIVE • OPERATED BY RADHA ENTERPRISES • ALL RIGHTS RESERVED
                    </p>
                    <div className="flex gap-8 items-center opacity-20 grayscale transition-all hover:opacity-40">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-4" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-4" />
                        <img src="https://img.icons8.com/color/48/000000/upi.png" className="h-4" />
                        <img src="https://img.icons8.com/color/48/000000/rupay.png" className="h-4" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
