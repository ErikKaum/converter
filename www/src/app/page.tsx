'use client'

import { Upload } from 'lucide-react'
import { useState } from 'react';
import { toast } from "sonner"

export default function Home() {
  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState<File>()
  const [prompt, setPrompt] = useState('Transcribe all the text you can see in the image')
  const [schema, setSchema] = useState('name: string, age: number')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    if (!prompt) return 
    if (!schema) return

    try {
      toast("⌛ starting extraction", {
        duration: 3000,
      })
      const data = new FormData()
      data.set('file', file)

      console.log(file)
      console.log(prompt)
      console.log(schema)

      // const res = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: data
      // })
      // handle the error
      // if (!res.ok) throw new Error(await res.text())
    } catch (e) {
      // Handle errors here
      console.error(e)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileSelected(true)
      setFile(file)
    } else {
      setFileSelected(false)
    }
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }

  const handleSchemaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchema(event.target.value)
  }
 
  return (
    <main className="flex flex-1 justify-center items-center">
      <div className='flex flex-col lg:flex-row w-full justify-around items-center'>

      <form
      className='flex w-1/3 flex-col space-y-5 justify-center items-center'
      onSubmit={onSubmit}
      >

        <div className='flex flex-col w-full'>
          <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          onChange={handleFileChange}
          />
          <span className='w-full text-left'>1. Upload a PDF</span>
          <label htmlFor="file" className="flex w-full border bg-white p-5 text-sm rounded-lg hover:cursor-pointer justify-center items-center">
            <Upload />
            <span className="ml-2">{fileSelected ? `File chosen: ${file?.name}` : 'Click to choose file'}</span>
          </label>
        </div>

        <div className='flex flex-col w-full'>
          <span className='w-full mt-4 text-left'>2. Describe what should be extracted form the PDF</span>
          <textarea
          name="image-prompt"
          defaultValue={prompt}
          className="w-full p-2 h-24 text-sm border rounded"
          onChange={handlePromptChange}
          />
        </div>

        <div className='flex flex-col w-full'>
          <span className='w-full mt-4 text-left'>3. And how should it be formatted in json?</span>
          <textarea
          name="schema"
          defaultValue={schema}
          className="w-full p-2 h-24 text-sm border rounded"
          onChange={handleSchemaChange}
          />

        </div>
        
        <input className='bg-slate-800 py-2 px-5 rounded-lg text-white hover:cursor-pointer hover:bg-slate-600' type="submit" value="Run 🚀" />
      </form>

      <div className='flex min-h-64 w-1/3 bg-white border rounded-lg space-y-5 justify-center items-center'>
        Result comes here
      </div>
   
      </div> 
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
