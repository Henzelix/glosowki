import { firestore, storage } from "../lib/firebase";
import { useState } from "react";
import algoliasearch from "algoliasearch";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import styled from "styled-components";
import Metatags from "../components/Metatags";

export default function AddingAudioPage() {

    const searchClient = algoliasearch('OV2TU24RSW', 'ac8101d1f43da39562005ad4cbdd8c9c');
    const index = searchClient.initIndex('glosowki');

    const router = useRouter();

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState();

    const upload = async () => {
        let referenceToFile = storage.ref().child(`files/${file.name}`);
        await referenceToFile.put(file);
        let url = await referenceToFile.getDownloadURL();

        let doc = firestore.collection('glosowki').doc();

        await doc.set(
            {
                author: author,
                content: content,
                addedAt: new Date(),
                fileUrl: url
            }
        ).then(() => {
            index.saveObject(
                {
                    author: author,
                    content: content,
                    addedAt: new Date(),
                    fileUrl: url,
                    objectID: doc.id
                }
            );
        });

        toast.success("Udalo sie!");
        router.push('/');

    }

    return (
        <>
            <Metatags title={"Dodawanie Głosówki"}/>
            <div>
                <main style={{ height: "100vh" }}>
                    <Container>
                    <br /><br /><AuthorInput onChange={(event) => {setAuthor(event.target.value); console.log(author)}} type="text" placeholder="Autor nagrania:" name="author" id="authorInput" /><br /><br />
                        <ContentInput onChange={(event) => {setContent(event.target.value); console.log(content)}} name="content" id="contentInput" placeholder="Treść nagrania:" cols="30" rows="10"></ContentInput><br /><br />
                        <FileInput onChange={(event) => {setFile(event.target.files[0]); console.log(file)}} type="file" name="file" id="fileInput" accept=".mp4" /><br /><br />
                        <Button onClick={() => {upload()}}>Zapisz</Button><br /><br />
                    </Container>
                </main>
            </div>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
`;

const AuthorInput = styled.input`
  border: none;
  border-bottom: 10px solid #f5dd00;
  font-size: 2rem;
  text-align: center;
  &:focus{
    outline: none;
  }
`;

const ContentInput = styled.textarea`
    border: 10px solid #f5dd00;
    font-size: 1rem;
    text-align: center;
    &:focus{
        outline: none;
    }
`;

const FileInput = styled.input`
  background-color: #f5dd00;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  padding: 15px;
  cursor: pointer;
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