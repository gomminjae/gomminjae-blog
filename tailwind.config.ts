import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.300"), // 기본 텍스트 연한 회색
            h1: {
              color: theme("colors.white"), // H1 헤더 흰색
              fontWeight: "700",
              fontSize: "2.25rem",
            },
            h2: {
              color: theme("colors.gray.200"), // H2 헤더 연한 회색
              fontWeight: "600",
            },
            h3: {
              color: theme("colors.gray.300"), // H3 헤더 조금 더 연한 회색
            },
            a: {
              color: theme("colors.blue.400"), // 링크 파란색
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.blue.300"), // 링크 호버 연한 파란색
              },
            },
            strong: {
              color: theme("colors.white"), // 강조 텍스트 흰색
              fontWeight: "bold",
            },
            blockquote: {
              color: theme("colors.gray.400"), // 블록 인용문 색상
              borderLeftColor: theme("colors.gray.600"),
              fontStyle: "italic",
            },
            code: {
              color: theme("colors.yellow.300"), // 인라인 코드 텍스트 연한 노란색
              backgroundColor: theme("colors.gray.800"), // 인라인 코드 배경
              padding: "0.2rem 0.4rem",
              borderRadius: theme("borderRadius.sm"),
            },
            pre: {
              backgroundColor: theme("colors.gray.900"), // 코드 블록 배경
              color: theme("colors.gray.200"), // 코드 블록 텍스트 색상
              padding: theme("spacing.4"), // 코드 블록 내부 여백
              borderRadius: theme("borderRadius.md"), // 둥근 모서리
              overflowX: "auto", // 가로 스크롤
              border: `1px solid ${theme("colors.gray.700")}`, // 코드 블록 테두리
            },
            "pre code": {
              color: "inherit", // highlight.js와 통합
              backgroundColor: "inherit", // highlight.js와 통합
            },
            "ul > li::marker": {
              color: theme("colors.blue.400"), // 목록 마커 색상
            },
            hr: {
              borderColor: theme("colors.gray.700"), // 구분선 색상
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.6"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
