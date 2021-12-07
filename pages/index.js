import { firestore } from "../lib/firebase";
import algoliasearch from "algoliasearch";
import useSWR from "swr";
import styled from "styled-components";
import { useState, useRef } from "react";
import Metatags from "../components/Metatags";
import Link from "next/link";

export default function Home() {

  const fetchPosts = async (colName) => {
    const posts = await firestore.collection(colName).get();
    console.log(posts.docs.map(doc => {return {...doc.data(), id: doc.id} }));
    return posts.docs.map(doc => {return {...doc.data(), id: doc.id} });
  }

  const { data, error } = useSWR('glosowki', fetchPosts);

  const searchClient = algoliasearch('OV2TU24RSW', 'ac8101d1f43da39562005ad4cbdd8c9c');
  const index = searchClient.initIndex('glosowki');

  const [posts, setPosts] = useState([]);
  const postsRef = useRef();
  postsRef.current = posts;

  const [searchQuery, setSearchQuery] = useState('');

  const searchingQuestion = async (searchValue) => {
    setSearchQuery(searchValue.trim());
    await index.search(searchValue.trim()).then((result) => {
      setPosts(result.hits);
      console.log(result.hits);
    });
  }

  if(error || !data) return <h1>Ładowanie...</h1>
  return (
    <>
      <Metatags title={"Głosówki 3B"} />
      <div>
        <main>
          <FirstSection>
            <div style={{ textAlign: "center" }}>
              <a href="/"><Header>Głosówki</Header></a>
              <a href="/addAudio"><Button>Dodaj nową</Button></a><br /><br /><br />
              <SearchInput onChange={(event) => {searchingQuestion(event.target.value)}} type="text" placeholder="Wyszukaj po autorze lub treści" name="search" id="searchInput"/>
            </div>
          </FirstSection>
          <SecondSection>
            <PostsContainer>
              {
                searchQuery.trim()!='' ?
                  postsRef.current.map((post) => {
                    return(
                      <Link key={post.id} href={`/glosowka/${post.objectID}`}>
                        <a>
                          <Post key={post.objectID}>
                            <h1>{post.author}</h1>
                            <h3>{post.content}</h3>
                            <h6>{"Dodane: " + post.addedAt.substring(0, 10)}</h6>
                            <audio controls src={post.fileUrl}></audio>
                          </Post>
                        </a>
                      </Link>
                    )
                  })
                :
                  data.map((post) => {
                    return(
                      <Link key={post.id} href={`/glosowka/${post.id}`}>
                        <ATag>
                          <Post key={post.id}>
                            <h1>{post.author}</h1>
                            <h3>{post.content}</h3>
                            <h6>{"Dodane: " + new Date(+post.addedAt.seconds*1000).toLocaleString('pl-PL')}</h6>
                            <audio controls src={post.fileUrl}></audio>
                          </Post>
                        </ATag>
                      </Link>
                    )
                  })
              }
            </PostsContainer>
          </SecondSection>
        </main>
      </div>
    </>
  )
}

const FirstSection = styled.section`
  border-bottom: 1px dashed #a1a1a1;
  padding-bottom: 25px;
`;

const SecondSection = styled.section`

`;

const Header = styled.h1`
  font-size: 4.5rem;
  -webkit-text-stroke: 2px black;
  color: #f5dd00;
`;

const Button = styled.button`
  background-color: #f5dd00;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  padding: 15px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: 10px solid #f5dd00;
  font-size: 2rem;
  text-align: center;
  width: 50vw;
  &:focus{
    outline: none;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 90vw;
  justify-content: space-evenly;
  margin-left: auto;
  margin-right: auto;
`;

const ATag = styled.a`
  display: flex;
  width: 30%;
  min-width: 350px;
`;

const Post = styled.div`
  width: 100%;
  min-width: 350px;
  border: 5px #f5dd00 solid;
  border-radius: 15px;
  text-align: center;
  margin-top: 25px;
  cursor: pointer;
`;