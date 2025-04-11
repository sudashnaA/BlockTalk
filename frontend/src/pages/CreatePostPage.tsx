import Container from "../components/Container";
import Title from "../components/Title";
import MainForm from "../components/FormComponents/MainForm";
import ButtonsContainer from "../components/ButtonsContainer";
import PopupForm from "../components/FormComponents/PopupForm";

import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";

const CreatePostPage = () => {
    const { name } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [imgOpen, setImgOpen] = useState(false);
    const [url, setUrl] = useState("");

    const submitForm = (e: Event) => {
        e.preventDefault();
        if (title.length <= 50 && content.length <= 2000){
            console.log(title, content);
        }
    };

    const addImg = (e: FormEvent) => {
        e.preventDefault();
        setContent(content + `[img]${url}[img]`);
        setUrl("");
        setImgOpen(false);
    }

    return(
        <Container>
            {imgOpen && 
                <PopupForm setOpen={setImgOpen} >
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#" onSubmit={(e) => addImg(e)}>
                            <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900">URL Link:</label>
                            <input type="text" onChange={(e) => setUrl(e.target.value)} id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Link..." required />
                            <input value="Add Image" type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-2 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"></input>
                        </form>
                    </div>
                </PopupForm>
            }


            <Title text="Create Post:"/>
            <MainForm full={true} OnSubmit={(e) => submitForm(e)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title"/>
                </div>

                <ButtonsContainer itemsEnd={false}>
                    <button type="button" onClick={() => setImgOpen(!imgOpen)} className="border-4 hover:border-blue-800"><img className="h-8 w-8 object-contain" src="/image-svgrepo-com.svg"/></button>
                </ButtonsContainer>

                <div className="mb-4 mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className="shadow appearance-none border rounded w-full h-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none" id="content" placeholder="Content"></textarea>
                </div>
                <div className="flex flex-col items-center">
                    <input className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Create Post"></input>
                </div>
            </MainForm>
        </Container>
    )

}

export default CreatePostPage;