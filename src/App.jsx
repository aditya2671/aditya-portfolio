import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#certs', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

const social = [
  { href: 'mailto:adityaishan18@gmail.com', label: 'Email' },
  { href: 'https://www.linkedin.com/in/aditya-ishan-321bb6253', label: 'LinkedIn' },
  { href: 'https://github.com/aditya2671', label: 'GitHub' },
]

const skills = {
  'Programming & Scripting': ['C++', 'Java', 'JavaScript', 'SQL', 'NoSQL', 'HTML', 'CSS'],
  'Frameworks & Libraries': ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Recharts'],
  'Core Competencies': ['DSA', 'System Design', 'API Development', 'AI & ML Basics'],
  'Tools & Platforms': ['Git', 'GitHub', 'Linux', 'MongoDB', 'PostgreSQL'],
  'Soft Skills': ['Communication', 'Analytical Thinking', 'Teamwork', 'Multitasking'],
}

const projects = [
  {
    title: 'Finance Management System',
    stack: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Recharts'],
    points: [
      'Architected and developed a full-stack finance application serving 10+ users.',
      'Designed optimized database schema, improving query response time by ~25%.',
      'Integrated AI-powered chatbot for financial queries and interactive data visualization.',
    ],
    links: [{label:'Repo', href:'https://github.com/aditya2671'}],
  },
  {
    title: 'Dummy Data Generator',
    stack: ['JavaScript'],
    points: [
      'Engineered a customizable data generation tool supporting multiple formats with instant download functionality.'
    ],
    links: [{label:'Demo', href:'https://github.com/aditya2671'}],
  },
  {
    title: 'AI Meeting Scheduler (Ongoing)',
    stack: ['NLP', 'Chatbot UI', 'AI Integration'],
    points: [
      'Designed an AI/NLP-based scheduler automating multi-timezone meeting planning.',
      'Implemented intent detection and chatbot UI for seamless scheduling.'
    ],
    links: [],
  },
]

const certs = [
  'IBM Artificial Intelligence Fundamentals — AI and ML Concepts',
  'IBM Machine Learning Basics — Supervised and Unsupervised Learning',
  'IBM IT Fundamentals — Networking, Databases, Cybersecurity',
  'Coursera Linux Fundamentals — CLI, Shell Scripting, System Administration',
  'Cisco Networking Academy: Introduction to Modern AI (Sep 2025)'
]

function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark]
}

export default function App() {
  const [dark, setDark] = useDarkMode()
  const [formStatus, setFormStatus] = useState('')

  async function handleContactSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    }
    // Try EmailJS if user sets up keys, otherwise fallback to mailto
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (serviceId && templateId && publicKey) {
      setFormStatus('Sending...')
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: data
          })
        })
        if (res.ok) {
          setFormStatus('Message sent — thank you!')
          form.reset()
        } else {
          throw new Error('EmailJS failed')
        }
      } catch (err) {
        setFormStatus('Failed to send using EmailJS. Opening mail client...')
        window.location.href = `mailto:adityaishan18@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + data.name)}&body=${encodeURIComponent(data.message + '\\n\\nContact: ' + data.email)}`
      }
    } else {
      // Fallback to mailto
      window.location.href = `mailto:adityaishan18@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + data.name)}&body=${encodeURIComponent(data.message + '\\n\\nContact: ' + data.email)}`
    }
  }

  return (
    <div className="text-neutral-800 dark:text-neutral-200">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200 dark:border-neutral-800">
        <nav className="container-max flex items-center gap-4 py-3">
          <a href="#" className="font-semibold">Aditya Ishan</a>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {links.map(l => (
                <a key={l.href} href={l.href} className="text-sm hover:opacity-80">{l.label}</a>
              ))}
              <a href="/Aditya_Ishan_Resume.pdf" className="btn btn-primary ml-2" download>Download Resume</a>
            </div>
            <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)} className="btn"> {dark ? 'Light' : 'Dark'} </button>
            <div className="md:hidden ml-2">
              <details className="relative">
                <summary className="btn">Menu</summary>
                <div className="absolute right-0 mt-2 w-56 card p-3 flex flex-col gap-2">
                  {links.map(l => <a key={l.href} href={l.href} className="text-sm">{l.label}</a>)}
                  <a href="/Aditya_Ishan_Resume.pdf" className="btn btn-primary mt-2" download>Resume</a>
                </div>
              </details>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container-max grid md:grid-cols-[1.3fr,0.9fr] items-center gap-8 py-14">
        <div>
          <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="text-3xl md:text-5xl font-bold leading-tight">
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-300">Aditya Ishan</span> — Full-Stack Developer (MERN).
          </motion.h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Building scalable web applications, integrating AI, and solving problems with clean code.
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Bangalore, Karnataka · +91 7061177513</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {social.map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="btn">{s.label}</a>
            ))}
            <a href="/Aditya_Ishan_Resume.pdf" className="btn" download>Resume</a>
          </div>
        </div>
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.6}} className="card p-6 flex flex-col items-center justify-center">
          <img src="/profile.jpg" alt="Aditya Ishan" className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-neutral-900 shadow-md" />
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Aditya Ishan</p>
          <p className="mono mt-1">Full-Stack Developer</p>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="container-max py-10">
        <h2 className="section-title">About</h2>
        <div className="card p-6 mt-4 leading-relaxed">
          <p>
            Hands-on full-stack developer with expertise in the MERN stack. Strong in DSA, OOP, system design basics, AI integration, and problem-solving.
            Experienced in building scalable web applications and delivering user-focused products. Strong communicator with proven teamwork, analytical
            thinking, and adaptability in dynamic environments.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container-max py-10">
        <h2 className="section-title">Technical Skills</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {Object.entries(skills).map(([k,v]) => (
            <div key={k} className="card p-5">
              <p className="font-semibold">{k}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {v.map(item => <span key={item} className="badge">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container-max py-10">
        <h2 className="section-title">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {projects.map((p) => (
            <motion.article key={p.title} initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="card p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2">{p.stack.map(s => <span key={s} className="badge">{s}</span>)}</div>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                {p.points.map(pt => <li key={pt}>{pt}</li>)}
              </ul>
              {p.links?.length ? (
                <div className="mt-3 flex gap-3">{p.links.map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-primary">{l.label}</a>)}</div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="container-max py-10">
        <h2 className="section-title">Experience</h2>
        <div className="card p-6 mt-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="font-semibold">Jain University — In-house Intern</p>
            <span className="mono text-neutral-500">Jun 2024 – Present · Bangalore, India</span>
          </div>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>Developed a password-strength checker and manager used by 20+ students, reducing weak password usage by ~40%.</li>
            <li>Led a group project on finance management with an AI-based chatbot, improving query resolution by ~30%.</li>
            <li>Applied system design principles to create scalable, secure project architectures.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="container-max py-10">
        <h2 className="section-title">Education</h2>
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <div className="card p-6">
            <p className="font-semibold">Jain University</p>
            <p className="mono">B.Tech in Computer Science · 2022 – 2026 (Expected) · Bangalore, India</p>
          </div>
          <div className="card p-6">
            <p className="font-semibold">Neelmani Kedarnath Higher Secondary School</p>
            <p className="mono">XII (Bihar Board) · 2022 · Bihar, India</p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="container-max py-10">
        <h2 className="section-title">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {certs.map(c => (
            <div key={c} className="card p-5">{c}</div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container-max py-10">
        <h2 className="section-title">Contact</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="card p-6">
            <p>Have an opportunity or want to collaborate?</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="mailto:adityaishan18@gmail.com?subject=Opportunity%20for%20Aditya%20Ishan">Email Me</a>
              <a className="btn" href="https://www.linkedin.com/in/aditya-ishan-321bb6253" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn" href="https://github.com/aditya2671" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>

          <form className="card p-6" onSubmit={handleContactSubmit}>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" required className="mt-1 block w-full rounded-md border border-neutral-300 p-2 bg-white dark:bg-neutral-900" />

            <label className="block text-sm font-medium mt-3">Email</label>
            <input name="email" type="email" required className="mt-1 block w-full rounded-md border border-neutral-300 p-2 bg-white dark:bg-neutral-900" />

            <label className="block text-sm font-medium mt-3">Message</label>
            <textarea name="message" rows="4" required className="mt-1 block w-full rounded-md border border-neutral-300 p-2 bg-white dark:bg-neutral-900" />

            <div className="mt-4 flex items-center gap-3">
              <button type="submit" className="btn btn-primary">Send Message</button>
              <span className="mono text-sm">{/* form status */}</span>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-8">
        <div className="container-max text-sm flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Aditya Ishan</span>
          <a className="hover:opacity-80" href="/Aditya_Ishan_Resume.pdf" download>Download Resume</a>
        </div>
      </footer>
    </div>
  )
}
