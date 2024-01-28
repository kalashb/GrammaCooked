import React from "react"
import RecipePanelContainer from "./RecipePanel/RecipePanelContainer";
import TagsListContainer from "./TagsListContainer/TagsListContainer.tsx";

interface HomePageProps {
    
};

const HomePage : React.FC<HomePageProps> = () => {
    
    return (
        <TagsListContainer />
    )
}

export default HomePage;