/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Users, Lightbulb, Heart, Menu, X, Linkedin, Facebook, Mail, Calendar, Tag, ExternalLink, Play, Pause, Volume2, VolumeX, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { blogPosts } from "./blogData";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("Tất cả");
  const [displayedPosts, setDisplayedPosts] = useState<typeof blogPosts>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const uniqueTags = ["Tất cả", ...new Set(blogPosts.map(post => post.tag))];

  useEffect(() => {
    // Initial load: Shuffle and take 20
    setDisplayedPosts([...blogPosts].sort(() => 0.5 - Math.random()).slice(0, 20));
  }, []);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    if (tag === "Tất cả") {
      setDisplayedPosts([...blogPosts].sort(() => 0.5 - Math.random()).slice(0, 20));
    } else {
      setDisplayedPosts(blogPosts.filter(post => post.tag === tag));
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      <audio ref={audioRef} loop src="https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-teal-900 tracking-tight">Med<span className="text-teal-600">LEADERS</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#blog" className="text-slate-600 hover:text-teal-700 transition-colors text-sm font-medium uppercase tracking-wider">Tin tức</a>
              <a href="#about-us" className="text-slate-600 hover:text-teal-700 transition-colors text-sm font-medium uppercase tracking-wider">Về chúng tôi</a>
              
              {/* Music Player Controls */}
              <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                <button onClick={togglePlay} className="p-2 text-slate-500 hover:text-teal-700 transition-colors rounded-full hover:bg-slate-100" title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc nền"}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button onClick={toggleMute} className="p-2 text-slate-500 hover:text-teal-700 transition-colors rounded-full hover:bg-slate-100" title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}>
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              <button onClick={scrollToContact} className="bg-teal-700 text-white px-6 py-2.5 rounded-full hover:bg-teal-800 transition-all shadow-sm hover:shadow-md text-sm font-medium">
                Liên hệ
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <div className="flex items-center gap-1">
                <button onClick={togglePlay} className="p-2 text-slate-500 hover:text-teal-700 transition-colors">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-teal-700 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#blog" className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-md">Tin tức</a>
              <a href="#about-us" className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-md">Về chúng tôi</a>
              <div className="pt-4">
                <button onClick={() => { scrollToContact(); setIsMenuOpen(false); }} className="w-full bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors font-medium">
                  Liên hệ ngay
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.span variants={fadeIn} className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6 border border-teal-100">
              Mạng lưới Lãnh đạo Y tế Trẻ
            </motion.span>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              Young Minds. <br className="hidden md:block" />
              <span className="text-teal-700 italic">Real Leaders.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Mạng lưới Truyền thông độc đáo được xây dựng bởi và dành cho các Lãnh đạo Y tế trẻ Việt Nam.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-8 py-4 bg-teal-700 text-white rounded-full font-medium hover:bg-teal-800 transition-all shadow-lg hover:shadow-teal-200/50 flex items-center justify-center gap-2 group">
                Tham gia mạng lưới
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition-all hover:border-slate-300 flex items-center justify-center">
                Tìm hiểu thêm
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section (Moved Up) */}
      <section id="blog" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Tin tức & Sự kiện</h2>
            <p className="text-lg text-slate-600">Cập nhật những xu hướng mới nhất trong lĩnh vực y tế và công nghệ sinh học.</p>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeTag === tag
                    ? "bg-teal-700 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700 border border-transparent"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-700 uppercase tracking-wide shadow-sm">
                    {post.tag}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span className="mx-1">•</span>
                    <span className="text-teal-600 font-medium">{post.source}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <span className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors group/link">
                      Đọc tiếp
                      <ExternalLink className="w-3 h-3 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm">
              Xem tất cả bài viết
            </button>
          </div>
        </div>
      </section>

      {/* About Us Group Container */}
      <div id="about-us" className="bg-slate-50">
        
        {/* About / Mission Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl relative z-10">
                  <img 
                    src="https://picsum.photos/seed/medleaders/800/600" 
                    alt="Medical Leadership" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-2/3 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xl border-8 border-white hidden md:block z-20">
                   <img 
                    src="https://picsum.photos/seed/doctors/600/450" 
                    alt="Young Doctors" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-100 rounded-full -z-10"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2 block">Về chúng tôi</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                  Kiến tạo tương lai y tế
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  MedLEADERS không chỉ là một mạng lưới kết nối, mà là một hệ sinh thái nuôi dưỡng những tài năng trẻ trong lĩnh vực y tế. Chúng tôi tin rằng sự đổi mới bắt đầu từ những tư duy trẻ, dám nghĩ, dám làm.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Sứ mệnh của chúng tôi là kết nối, truyền cảm hứng và trao quyền cho thế hệ lãnh đạo y tế tiếp theo của Việt Nam, giúp họ phát huy tối đa tiềm năng và tạo ra những tác động tích cực cho cộng đồng.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="border-l-4 border-teal-500 pl-4">
                    <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide">Thành viên</div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="text-3xl font-bold text-slate-900 mb-1">50+</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide">Dự án</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features / Values Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2 block">Giá trị</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Giá trị cốt lõi</h2>
              <p className="text-lg text-slate-600">Những nền tảng vững chắc giúp MedLEADERS định hình và phát triển cộng đồng.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8 text-teal-600" />,
                  title: "Kết nối Chuyên sâu",
                  description: "Mở rộng mạng lưới quan hệ với các chuyên gia đầu ngành và đồng nghiệp cùng chí hướng trên toàn quốc."
                },
                {
                  icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
                  title: "Tư duy Đổi mới",
                  description: "Khuyến khích sáng tạo và áp dụng các giải pháp công nghệ mới vào thực tiễn quản lý và chăm sóc sức khỏe."
                },
                {
                  icon: <Heart className="w-8 h-8 text-rose-500" />,
                  title: "Tác động Xã hội",
                  description: "Thực hiện các dự án cộng đồng ý nghĩa, mang lại giá trị thiết thực cho hệ thống y tế và người bệnh."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group"
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-24 bg-teal-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 opacity-30"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-teal-700/50 shadow-2xl max-w-sm mx-auto">
                  <img 
                    src="https://picsum.photos/seed/founder/500/500" 
                    alt="Phạm Anh Tuấn" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <span className="text-teal-300 font-bold uppercase tracking-widest text-sm mb-2 block">Đội ngũ lãnh đạo</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Phạm Anh Tuấn</h2>
                <p className="text-teal-200 text-lg mb-6 uppercase tracking-widest font-medium">Founder MedLEADERS</p>
                <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 text-teal-50">
                  "Chúng ta không chỉ đào tạo những bác sĩ giỏi, mà còn phải xây dựng những nhà lãnh đạo có tầm nhìn, có tâm và có khả năng thay đổi diện mạo y tế Việt Nam."
                </blockquote>
                <div className="flex justify-center md:justify-start gap-4">
                  <a href="#" className="p-3 bg-teal-800/50 rounded-full hover:bg-teal-700 transition-colors backdrop-blur-sm border border-teal-700">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="p-3 bg-teal-800/50 rounded-full hover:bg-teal-700 transition-colors backdrop-blur-sm border border-teal-700">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="p-3 bg-teal-800/50 rounded-full hover:bg-teal-700 transition-colors backdrop-blur-sm border border-teal-700">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section (New) */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2 block">Liên hệ</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Kết nối với chúng tôi</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Bạn có ý tưởng hợp tác, muốn tham gia mạng lưới hay chỉ đơn giản là muốn chia sẻ câu chuyện của mình? Đừng ngần ngại liên hệ với MedLEADERS.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-50 rounded-lg text-teal-700">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                      <p className="text-slate-600">contact@medleaders.vn</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-50 rounded-lg text-teal-700">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">LinkedIn</h4>
                      <p className="text-slate-600">MedLEADERS Network</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-50 rounded-lg text-teal-700">
                      <Facebook className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Facebook</h4>
                      <p className="text-slate-600">MedLEADERS Vietnam</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Họ tên</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Chủ đề</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                      <option>Hợp tác</option>
                      <option>Tham gia mạng lưới</option>
                      <option>Góp ý nội dung</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nội dung</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white" placeholder="Nội dung tin nhắn..."></textarea>
                  </div>
                  <button type="button" className="w-full bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors font-medium flex items-center justify-center gap-2">
                    Gửi tin nhắn <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="font-serif text-2xl font-bold text-white tracking-tight mb-4 block">Med<span className="text-teal-500">LEADERS</span></span>
              <p className="max-w-xs text-sm leading-relaxed">
                Mạng xã hội chia sẻ Quan điểm - Kiến thức Y Dược Việt Nam. Young Minds. Real Leaders.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Liên kết</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#blog" className="hover:text-teal-400 transition-colors">Tin tức</a></li>
                <li><a href="#about-us" className="hover:text-teal-400 transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Dự án</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Tuyển dụng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Liên hệ</h4>
              <ul className="space-y-2 text-sm">
                <li>contact@medleaders.vn</li>
                <li>+84 123 456 789</li>
                <li>Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} MedLEADERS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedPost(null)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 rounded-full backdrop-blur-sm transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="overflow-y-auto">
              <div className="relative h-64 sm:h-80 w-full">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-700 uppercase tracking-wide shadow-sm">
                  {selectedPost.tag}
                </div>
              </div>
              
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedPost.date}</span>
                  <span className="mx-2">•</span>
                  <span className="text-teal-600 font-medium">{selectedPost.source}</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  {selectedPost.title}
                </h2>
                
                <div className="prose prose-slate prose-teal max-w-none">
                  <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6">
                    {selectedPost.excerpt}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Đây là nội dung chi tiết của bài viết. Trong môi trường thực tế, nội dung này sẽ được tải từ cơ sở dữ liệu hoặc CMS. Hiện tại, đây là văn bản mô phỏng để thể hiện giao diện của bài viết khi được mở rộng.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    MedLEADERS cam kết mang đến những thông tin cập nhật, chính xác và chuyên sâu nhất về các lĩnh vực Y tế số, Khởi nghiệp, Phản biện - Tranh luận và nhiều chủ đề quan trọng khác nhằm hỗ trợ các nhà lãnh đạo y tế trẻ tại Việt Nam.
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Phân tích chuyên sâu</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Sự phát triển của công nghệ đang định hình lại toàn bộ hệ sinh thái chăm sóc sức khỏe. Từ việc ứng dụng trí tuệ nhân tạo trong chẩn đoán hình ảnh đến việc sử dụng dữ liệu lớn (Big Data) để cá nhân hóa phác đồ điều trị, mọi thứ đang thay đổi với tốc độ chóng mặt.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Để bắt kịp xu hướng này, các chuyên gia y tế không chỉ cần trau dồi kiến thức chuyên môn mà còn phải liên tục cập nhật các kỹ năng mới về quản lý, công nghệ và tư duy đổi mới sáng tạo.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

