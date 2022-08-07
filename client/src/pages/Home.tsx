import { Content, FAQ, Footer, Header, Hero, Team } from "../components/home";
import NewsLetter from "../components/home/NewsLetter";

export const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Content />
      <Team />
      <NewsLetter />
      <FAQ />
      <Footer />
    </>
  );
};
