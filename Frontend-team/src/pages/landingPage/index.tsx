
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import ProjectCategories from './components/ProjectCategories';
import JoinCommunity from './components/JoinCommunity';
import EmpowerProject from './components/EmpowerProject';
/**
 * LandingPage component.
 *
 * This component serves as the main landing page of the application. 
 * It includes several sections to engage the user, such as the Hero section,
 * Featured Projects, How It Works, Why Choose Us, Empower Project, 
 * Project Categories, and Join Community.
 *
 * The component is structured with a set of nested components for 
 * organized content presentation. It also contains provisions for 
 * decorative background blurs to enhance visual appeal.
 *
 * @returns {JSX.Element} The complete landing page layout
 */

function LandingPage() {
    return (
      <div className="">
        {/* Background Blurs */}
        {/* <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-blur-purple rounded-full" />
          <div className="absolute top-[60%] right-20 w-[400px] h-[400px] bg-blur-purple rounded-full" />
          <div className="absolute bottom-20 left-1/2 w-[300px] h-[300px] bg-blur-purple rounded-full" />
        </div> */}
        
        {/* Content */}
        <div className="relative z-10 mt-24 md:mt-56">
          <Hero />
          <FeaturedProjects />
          <HowItWorks />
          <WhyChooseUs />
          <EmpowerProject/>
          <ProjectCategories />
          <JoinCommunity />
        </div>
      </div>
    )
  }

export default LandingPage