
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import { User } from './model/User';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

let data: User[] = [];

const dataFile = (): void => {
    fs.writeFile('user.json', JSON.stringify(data), function(err){
        if(err){
            console.log(err.message);
        }
    })
}

app.get('/', (req: Request, res: Response) => {
    res.json(data);
});

app.get('/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const index = data.findIndex(user => user.username === username);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    
    res.json(data[index]);

});

app.post('/', (req: Request, res: Response) => {
    const dataLength = (data.length - 1) + 1111;
    const user: User = req.body;
    user.id = dataLength.toString();
    data.push(user);
    return res.status(201).json({ message: 'User created successfully.' });
});

app.post('/signup/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const user: User = req.body;
    user.id = (data.length + 1111).toString();
    const usernameExist = data.find(existingUser => existingUser.username === username);

    if (usernameExist) {
        return res.status(409).json({ message: 'Username exists.' });
    }

    data.push(user);

    return res.status(201).json({ message: 'User created successfully.' });
});

app.post('/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const updatedData = req.body;

    const index = data.findIndex(user => user.username === username);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }

    data[index].friends.push(updatedData);

    return res.status(201).json({ message: 'User created successfully.' });
});

app.post('/friendlist/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const updatedData = req.body;

    const index = data.findIndex(user => user.username === username);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }

    data[index].friendList.push(updatedData);

    return res.status(201).json({ message: 'User created successfully.' });
});

app.put('/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const updatedUser = req.body;


    const index = data.findIndex(user => user.username === username);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    
    data[index] = { ...data[index], ...updatedUser };
    return res.status(201).json({ message: 'User created successfully.' });
});

app.put('/friendlist/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const updatedUser = req.body;


    const index = data.findIndex(user => user.username === username);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    
    data[index].friendList = [{...updatedUser }];
    return res.status(201).json({ message: 'User created successfully.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
