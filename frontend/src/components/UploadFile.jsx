import { Widget } from "@uploadcare/react-widget";

export default function UploadOptions(){

    

    return (
    <>
        <p>
        <label htmlFor='file'>Your file:</label>{' '}
        <Widget 
            publicKey='17a2c702f2e06519a68a'
            id='file' 
            name='file'
        />
        </p>,.
        onFileSelect={(file) => {
        console.log('File changed: ', file)

        if (file) {
            file.progress(info => console.log('File progress: ', info.progress))
            file.done(info => console.log('File uploaded: ', info))
        }
        }}
        onChange={info => console.log('Upload completed:', info)}
    </>
    );    
}