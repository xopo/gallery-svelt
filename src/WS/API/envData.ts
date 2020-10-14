import dotenv from 'dotenv';

dotenv.config();

const {IMAGESOURCE} = process.env;
const cwd = process.cwd();

export default {
    cwd,
    IMAGESOURCE
}