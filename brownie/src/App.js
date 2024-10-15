import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Carrot, Sun, Moon, ChevronDown, X } from "lucide-react";
import Brownie from "./assets/img/Brownie.jpg";
import Brownie2 from "./assets/img/Brownie2.jpg";
import Brownie3 from "./assets/img/Brownie3.jpg";
import Brownie4 from "./assets/img/Brownie4.jpg";
import Brownie5 from "./assets/img/Brownie5.png";

export default function AdvancedBrownieShowcase() {
  const [activeSection, setActiveSection] = useState("home");
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const navItems = ["Home", "Galerie", "Fakten", "Quiz"];

  const facts = [
    "Brownie liebt es, auf der Terrasse herumzuhoppeln",
    "Sie liebt Brot",
    "Wenn sie dich mag, wird sie dich abschlecken",
    "Sie ist ein sehr neugieriges Kaninchen",
    "Brownie ist 5 Jahre alt",
  ];

  const quizQuestions = [
    {
      question: "Welches Essen mag Brownie am liebsten?",
      options: ["Äpfel", "Karotten", "Kohl", "Brot"],
      answer: "Brot",
    },
    {
      question: "Welche Farbe hat Brownie?",
      options: ["Weiß", "Schwarz", "Braun-Grau", "Grau"],
      answer: "Braun-Grau",
    },
    {
      question: "Was macht Brownie, wenn sie dich mag?",
      options: ["Schlafen", "Abschlecken", "Die Pfote geben", "Tanzen"],
      answer: "Abschlecken",
    },
    {
      question: "Wie alt ist Brownie?",
      options: ["3 Jahre", "5 Jahre", "7 Jahre", "9 Jahre"],
      answer: "5 Jahre",
    },
  ];

  const galleryImages = [Brownie4, Brownie3, Brownie, Brownie5];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item));
      const scrollPosition = window.scrollY + 500;

      sections.forEach((section) => {
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (formData.get(`q${index}`) === q.answer) score++;
    });
    setQuizScore(score);
    setIsQuizActive(false);
    scrollTo("Quiz");
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-amber-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-md">
        <ul className="flex justify-center space-x-4 p-4">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item)}
                className={`capitalize ${
                  activeSection === item
                    ? "text-brown-600 font-bold"
                    : "text-gray-600"
                } hover:text-brown-800 transition-colors`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />

      <main className="container mx-auto px-4 pt-20">
        <section
          id="Home"
          className="min-h-screen flex flex-col items-center justify-center"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-center mb-4"
          >
            Hi, ich bin Brownie!
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl text-center mb-8"
          >
            Das einzige Kaninchen, das du kennen musst.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg"
          >
            <img
              src={Brownie2}
              alt="Brownie das Kaninchen"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <ChevronDown className="animate-bounce" />
          </motion.div>
        </section>

        <section id="Galerie" className="min-h-screen py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Erlesene Schnappschüsse von Brownie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={src}
                  alt={`Brownie ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setLightboxImage(src)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="Fakten" className="min-h-screen py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Fakten über Brownie
          </h2>
          <ul className="space-y-4 max-w-md mx-auto">
            {facts.map((fact, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md"
              >
                {fact}
              </motion.li>
            ))}
          </ul>
        </section>

        <section id="Quiz" className="min-h-screen py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Du denkst, du kennst Brownie? Teste dein Wissen!
          </h2>
          {isQuizActive ? (
            <form
              onSubmit={handleQuizSubmit}
              className="max-w-md mx-auto space-y-6"
            >
              {quizQuestions.map((q, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md"
                >
                  <p className="font-semibold mb-2">{q.question}</p>
                  {q.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="block mb-2">
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={option}
                        className="mr-2"
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-brown-600 text-white py-2 px-4 rounded-lg hover:bg-brown-700 transition-colors"
              >
                Submit Quiz
              </button>
            </form>
          ) : (
            <div className="text-center">
              {quizScore !== null ? (
                <p className="text-xl mb-4">
                  Du hast {quizScore} von {quizQuestions.length} Fragen richtig
                  beantwortet!{" "}
                  {quizScore <= 1
                    ? "Du solltest mehr über Brownie lernen!"
                    : quizScore <= 3
                    ? "Du kennst Brownie schon ganz gut!"
                    : "Du bist ein echter Brownie-Experte!"}
                </p>
              ) : null}
              <button
                onClick={() => setIsQuizActive(true)}
                className="bg-brown-600 py-2 px-4 rounded-lg hover:bg-brown-700 transition-colors"
              >
                {quizScore !== null ? "Nochmal versuchen" : "Quiz starten"}
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-brown-800 text-white py-4 mt-16">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2024 Brownie Fanclub</p>
          <div className="flex space-x-4">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.1,
                }}
              >
                <Carrot className="text-orange-500 w-6 h-6" />
              </motion.div>
            ))}
          </div>
        </div>
      </footer>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setLightboxImage("")}
          >
            <motion.img
              src={lightboxImage}
              alt="Lightbox image"
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setLightboxImage("")}
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
