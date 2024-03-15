import { Flex, Text, Button, TextField, TextArea, Badge } from '@radix-ui/themes';
import SevDropdown from './components/sevDropdown';
import FileDrop from './components/dragUpload';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ImageWithSkeleton from './components/imageSkeleton';


const label_style = {
    color: 'grey', // Makes text grey
    fontSize: '14px', // Smaller text
};

const main_content = {
    paddingTop: '5rem',
    paddingRight: '5rem',
    paddingLeft: '5rem',
};

const sev_map = {
    1: 'red',
    2: 'yellow',
    3: 'green',
};

const sev_label = {
    1: 'Severity 1',
    2: 'Severity 2',
    3: 'Severity 3',
};

const sev_descriptions = {
    1: 'Sev 1: Critical SLA breach, client relations at risk.',
    2: 'Sev 2: Major functionality loss, no workaround.',
    // 3: 'Sev 3: Minor issue, workaround available.',
};

// We create a function to fetch the data from the form and put it on the correct format
// We will use this function to send the data to the backend
const fetchData = (title: string, severity: number, coreService: string, description: string, files: File[]) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('severity', severity.toString());
  formData.append('coreService', coreService);
  formData.append('description', description);

  // Loop over each file and append it to the formData
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  return formData;
};


export default function Form() {
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState(null) as [number, (value: number) => void];
  const [coreService, setCoreService] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFile] = useState<File[]>([]);

  const handleNewFiles = (newFiles: File[]) => {
    toast.success('File uploaded successfully', {autoClose: 1000});
    setFile(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDelete = (index: number) => {
    toast.error('File removed', {autoClose: 1000});
    setFile(prevFiles => prevFiles.filter((_, i) => i !== index));
  }

  const handleSubmit = async () => {
    if (!title || !severity || !coreService || !description) {
        toast.error('Please fill in all fields.');
        return;
    }

    const formData = fetchData(title, severity, coreService, description, files);
    const formObject = Array.from(formData.entries()).reduce((obj, [key, value]) => {
        obj[key] = value instanceof File ? { name: value.name, path: value.path } : value;
        return obj;
    }, {});

    // Use the exposed ipc handler to send data
    window.ipc.send('form-submit', formObject);
    window.ipc.receiveOnce('form-submit-reply', (response) => {
      toast.success(response as any, {autoClose: 1000});
    });
    window.ipc.receiveOnce('form-submit-reply-email', (response) => {
      toast.success(response as any, {autoClose: 1000});
    });
  };


  return (
    // we place a settings button on the top right of the page
    // when clicked, it will open the settings page
    <div>
      <div>
        <Flex justify="end" style={{paddingRight: '5rem', paddingTop: '1rem'}}>
          <Button onClick={() => window.location.href = '/settings'} size="1" variant="soft" style={{cursor: 'pointer'}}>Settings</Button>
        </Flex>
      </div>
    <Flex justify="center" direction="column" style={main_content}>
      <div style={{paddingBottom: '1rem', justifyContent: 'space-between', display: 'flex'}}>
      <div>
      <Text size="8" weight="bold" style={{paddingRight: '2rem'}}>
        Panic Relief {severity && <Badge color={sev_map[severity]}>{sev_label[severity]}</Badge>}
      </Text>
      <Flex gap="1" style={{paddingTop: '1rem'}}>
          <SevDropdown onValueChange={setSeverity} />
      </Flex>
      </div>

      <Flex direction="column" gap="1" style={{ paddingLeft: '2rem', maxWidth: '20rem' }}>
        <Text style={{...label_style, fontWeight: 'bold'}}>Severity Descriptions:</Text>
        <Flex gap="1">
          <ol>
            {Object.keys(sev_descriptions).map((key) => (
              <li key={key}><Text style={{...label_style, fontSize: '11px'}}>{sev_descriptions[key]}</Text></li>
            ))}
          </ol>
        </Flex>
      </Flex>

      </div>

      <div>
        <Flex direction="column" gap="1" style={{paddingBottom: '1rem'}}>
          <Text style={label_style}>Title</Text>
          <TextField.Root>
            <TextField.Input 
                  id="title" 
                  value={title} 
                  placeholder='Title of panic attack...' 
                  onChange={(e) => setTitle(e.target.value)} 
                  />
          </TextField.Root>
        </Flex>
      </div>


      <Flex direction="column" gap="1" style={{paddingBottom: '1rem'}}>
        <Text style={label_style}>Core Service Affected</Text>
        <TextField.Root>
          <TextField.Input 
                id="coreService" 
                value={coreService} 
                placeholder='Core service affected...' 
                onChange={(e) => setCoreService(e.target.value)} 
                />
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1" style={{paddingBottom: '1rem'}}>
        <Text style={label_style}>Description</Text>
        <TextArea
                id="description" 
                value={description} 
                placeholder='Description of panic attack...' 
                onChange={(e) => setDescription(e.target.value)} 
                />
      </Flex>
        <Flex direction="column" gap="1">
          <Text style={label_style}>Images Uploaded {files.length > 0 && `(${files.length} files)`}</Text>
          <ImageWithSkeleton />
          <FileDrop onFiles={handleNewFiles} onRemove={handleDelete} />
        </Flex>

      <Flex justify="end" style={{paddingTop: '1rem'}}>
          <Button onClick={handleSubmit}>Submit</Button>
      </Flex>

    </Flex>
    </div>
  );
}