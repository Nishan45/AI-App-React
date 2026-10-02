import React from "react";
import { BookOpen, ChevronRight, FileWarning, HelpCircle, MessageSquare, Phone, ShieldCheck } from "lucide-react";
import "./HelpSupport.css";

const items=[
 ["FAQ","Find answers to common questions",HelpCircle],
 ["Contact Support","Get in touch with our team",MessageSquare],
 ["Report a Problem","Let us know about any issue",FileWarning],
 ["Guidelines & Policies","Read our rules and guidelines",BookOpen],
 ["Feedback","Share your thoughts with us",ShieldCheck]
];

export default function HelpSupport(){
 return <div className="page help-page">
  <div className="page-title-row"><div><h1 className="page-title">Help & Support</h1><p className="page-subtitle">We're here to help you!</p></div></div>
  <div className="help-grid"><section className="card help-list">{items.map(([name,desc,Icon])=><button key={name}><span className="help-icon"><Icon size={17}/></span><span className="help-text"><strong>{name}</strong><small>{desc}</small></span><ChevronRight size={15}/></button>)}</section>
  <aside className="card contact-card"><div className="contact-bot">🤖</div><h3>Need more help?</h3><p>Our support team is always here for you.</p><button className="btn btn-primary"><Phone size={12}/> Contact Now</button></aside></div>
 </div>
}
