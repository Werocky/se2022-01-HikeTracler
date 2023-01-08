import "../style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "../pages/AnimationRevealPage"
import Hero from "../pages/LandingPage"

function MainLayout(props) {

  return (

      <AnimationRevealPage>
        <Hero logout={props.logout}/>
      </AnimationRevealPage>

  );
}

export default MainLayout;