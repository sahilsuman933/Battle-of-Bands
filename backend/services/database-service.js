import db from "../database";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import Crypto from "crypto";

const DB = {
  async fetchData(collectionName) {
    let data = [];
    const usersCollectionRef = collection(db, collectionName);
    const query = await getDocs(usersCollectionRef);

    // Filter Data
    query.docs.map((doc) => {
      let field = doc._document.data.value.mapValue.fields;
      let id =
        doc._document.key.path.segments[
          doc._document.key.path.segments.length - 1
        ];
      let tempObject = { id };

      for (const key in field) {
        for (const valueType in field[key]) {
          tempObject[key] = field[key][valueType];
        }
      }

      data = [...data, tempObject];
    });

    return data;
  },
  async updateData(collectionName, id, data) {
    const userDoc = doc(db, collectionName, id);
    await updateDoc(userDoc, data);
  },
  async uploadImage(data) {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `${Crypto.randomBytes(32).toString("hex")}`
    );
    let imageURL;
    await uploadString(storageRef, data, "data_url").then();

    await getDownloadURL(storageRef)
      .then((url) => {
        imageURL = url;
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      imageURL,
    };
  },
  async addData(collectionName, data) {
    const usersCollectionRef = collection(db, collectionName);
    await addDoc(usersCollectionRef, data);
  },
};

export default DB;
