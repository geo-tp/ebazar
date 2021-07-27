
import {store} from "../store/store"
import { tokenSelector } from "../selectors/AuthSelectors";

export const API_URL = "http://localhost:8000/"


export const BASIC_HEADER = new Headers({
	"Content-Type": 'application/json',
	Accept: 'application/json',
})