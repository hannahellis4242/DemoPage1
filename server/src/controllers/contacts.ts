import { RequestHandler, response } from "express";
import { Callback, MongoClient } from "mongodb";
import Contact from "../models/contacts";

const dbUrl = "mongodb://localhost:27017/";

type GetterCallback = (result: Document[]) => void;
class ResultGetter {
  constructor(private callback: GetterCallback) {}
  getResult: Callback<Document[]> = (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      this.callback(result);
    }
  };
}

export const getAll: RequestHandler = (req, res, next) => {
  MongoClient.connect(dbUrl)
    .then((client: MongoClient) => {
      const database = client.db("address_book");
      const contacts = database.collection("contacts");
      const getter = new ResultGetter((x: Document[]) => {
        res.status(200).json(x);
      });
      contacts.find().toArray(getter.getResult.bind(getter));
    })
    .catch((err) => {
      throw err;
    });
};

/*export const getBookmarkById: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const target = req.params.id;
  console.log("finding target : " + target);
  MongoClient.connect(dbUrl, function (err, db) {
    if (err) throw err;
    const dbo = db.db("bookmarkDB");
    dbo
      .collection("bookmarks")
      .find({ _id: target })
      .toArray(function (err, result: Bookmark[]) {
        if (err) throw err;
        db.close();
        console.log(result);
        res.status(200).json(result);
      });
  });
};

export const getBookmarkByTag: RequestHandler<{ tag: string }> = (
  req,
  res,
  next
) => {
  const targetTag = req.params.tag;
  /*const bookmarks = bookmarkList.filter((value: Bookmark) => {
    const tagIndex = value.tags.findIndex((tag: string) => {
      return tag == targetTag;
    });
    return tagIndex > -1;
  });
  if (bookmarks.length === 0) {
    throw Error(`No bookmarks with tag ${targetTag} found`);
  }*/
/*res.status(200); //;.json(bookmarks);
};

export const updateBookmark: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const targetId = req.params.id;
  const updated = req.body as BookmarkData;
  MongoClient.connect(dbUrl, function (err, db) {
    if (err) throw err;
    const dbo = db.db("bookmarkDB");
    dbo
      .collection("bookmarks")
      .updateOne({ _id: targetId }, updated, function (err, result) {
        if (err) throw err;
        db.close();
        res.status(200).json(result);
      });
  });
};

export const removeBookmark: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const targetId = req.params.id;
  const index = -1; //= bookmarkList.findIndex((value: Bookmark) => {
  //  return value.id === targetId;
  //});
  if (index < 0) {
    throw Error("Could not find index");
  }
  //const removed = bookmarkList[index];
  //bookmarkList.splice(index, 1);
  res.status(200); //.json({ message: "Removed", removedBookmark: removed });
};
*/
