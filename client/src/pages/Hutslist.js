import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "../components/headers/light.js";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "../components/misc/Headings";
import { PrimaryButton } from "../components/misc/Buttons";
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons.js";
import { useNavigate } from "react-router-dom";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
        props.featured &&
        css`
            ${tw`w-full!`}
            ${Post} {
              ${tw`sm:flex-row! h-full sm:pr-4`}
            }
            ${Image} {
              ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
            }
            ${Info} {
              ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
            }
            ${Description} {
              ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
            }
          `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const PostAction = tw(PrimaryButtonBase)`w-full mt-8`;

function Huts(props) {
    const headingText = "Huts";
    const huts = props.huts;

    const [visible, setVisible] = useState(6);

    const onLoadMoreClick = () => {
        setVisible(v => v + 6);
        if (visible > huts.length) {
            setVisible(huts.length);
        }
    };


    return (
        <AnimationRevealPage>
            <Header logout={props.logout} />
            <Container>
                <ContentWithPaddingXl>
                    <HeadingRow>
                        <Heading>{headingText}</Heading>
                    </HeadingRow>
                    {!props.loading &&
                        <Posts>
                            {huts.slice(0, visible).map((hut, index) => (
                                <HutElement key={index} hut={hut} />
                            ))}
                        </Posts>
                    }
                    {!props.loading && (
                        <ButtonContainer>
                            <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
                        </ButtonContainer>
                    )}
                </ContentWithPaddingXl>
            </Container>
            {/*<Footer />*/}
        </AnimationRevealPage>
    );
}

function HutElement(props) {

    const hut = props.hut;
    const imageSrc = "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80";
    
    const navigate = useNavigate();

    let loc = hut.City?hut.City+", ":"" ;
    loc += hut.Province?hut.Province+", ":"";
    loc += hut.Region?hut.Region+", ":""
    loc += hut.Country?hut.Country:"";

    return (
        <PostContainer key={props.index}>
            <Post className="group" as="a">
                <Image imageSrc={imageSrc} />
                <Info>
                    <Title>{hut.Name}</Title>
                    <Category>{hut.Elevation} mt</Category>
                    <CreationDate>date</CreationDate>
                    <Description>{loc}</Description>
                    <PostAction onClick={ () => navigate('/huts/' + hut.RefPointID)}>View details</PostAction>
                </Info>
            </Post>
        </PostContainer>
    )
}


export default Huts;