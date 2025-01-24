interface HomeSectionProps {
  title: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ title }) => {
  return (
    <div className="px-6 sm:px-12 py-12">
      {/* 섹션 제목 */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10 sm:mb-12 text-center tracking-tight">
        {title}
      </h2>

      {/* 카드 리스트 */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="relative bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-[1.03] group overflow-hidden"
          >
            {/* 카드의 네온 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 rounded-2xl blur-xl transition-opacity group-hover:opacity-40"></div>

            {/* 카드의 내용 */}
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                Post Title {item}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Discover the fascinating details about Post {item}. This post
                dives into engaging topics.
              </p>
              <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md shadow-lg hover:opacity-90 transition-opacity">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
