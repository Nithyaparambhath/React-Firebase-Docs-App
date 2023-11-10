import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import {updateDoc, doc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditDoc({database}) {
    const [isMounted,setIsMounted] = useState(false)
    const [quillData,setQuillData]= useState('')
    const [docTitle,setDocTitle]= useState('')
    let params = useParams();
    const collectionRef = collection(database,'docsData')
    console.log(params);

    console.log(quillData);
    const navigate = useNavigate()

   
    const getQuillData = (value) => {
        setQuillData(value)
    }

   
        const updateDocsData = () => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                quillData: quillData
            })
            .then(() => {
                toast.info('Document Saved')
               

            })
           
            .catch(() => {
                toast.error('Cannot Save Document')
            })
            navigate('/')
        }


        const getData = () => {
            const document = doc(collectionRef, params.id)
            onSnapshot(document, (docs) => {
                setDocTitle(docs.data().title)
                setQuillData(docs.data().quillData);
            })
        }

        useEffect(() => {
            if (isMounted.current) {
                return
            }
    
           setIsMounted(true)
            getData()
        }, [])
        


  return (
    <div className='m-5 '>
        
        <h2>{docTitle}</h2>
    <ReactQuill value={quillData}  onChange={getQuillData} />
    <button onClick={updateDocsData} className='btn btn-info mt-3'>Save</button>
    <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </div>
  )
}

export default EditDoc