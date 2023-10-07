import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL,listAll, child } from "firebase/storage";
import app from '../lib/firebase';
import Image from 'next/image';

class Monkey {
  constructor(id, name, imageURL) {
    this.tier = 1;
    this.chosen = false;
    this.name = name;
    this.url = imageURL;
    this.id = id;
  }

  moveUpTier() {
    this.tier++;
  }

  wasChosen() {
    this.chosen = true;
  }

  reset() {
    this.chosen = false;
  }
}

export default function NumberButtons(){
/*
  const [numbers, setNumbers] = useState(Array.from({ length: 64 }, (_, i) => i));

  const [tierTwo, setTierTwo] = useState(Array.from({length:32}));
  const [tierThree, setTierThree] = useState(Array.from({length:16}));
  const [tierFour, setTierFour] = useState(Array.from({length:8}));

  const [currentTier, setCurrentTier] = useState(1);

  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);



  function tierComplete() {
    let winningMonkeys = 0;
    
    for (let key in monkey) {
      let m = monkey[key]
      if(Object.keys(m).tier = currentTier+1) {
        winningMonkeys++;
      }
    }
    
    if(winningMonkeys === 2**(6-currentTier)) {
      setCurrentTier(currentTier+1)
    }

  }

  
  useEffect(() => {    //inital rendering 
    if (numbers.length >= 2) {
      const index1 = Math.floor(Math.random() * numbers.length);
      const index2 = Math.floor(Math.random() * (numbers.length - 1));
      if (index2 === index1) {
        index2++;
      }
      setNumber1(numbers[index1]);
      setNumber2(numbers[index2]);
    }
  }, [numbers]);

  

  const leftClick = () => {
    setNumbers(numbers.filter((number) => number !== number1 && number !== number2))
    let getTier = monkey[number1].tier;
    const newMonkey = { ...monkey, [number1]:{tier: getTier+1}}
    setMonkey(newMonkey);
  }

  const rightClick = () => {
    setNumbers(numbers.filter((number) => number !== number1 && number !== number2))
    let getTier = monkey[number2].tier;
    const newMonkey = { ...monkey, [number2]:{tier: getTier+1}}
    setMonkey(newMonkey);
  }
*/

  
  function humanize(str) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  // get a reference from firebase folder.
  const storage = getStorage();
  const storageRef = ref(storage, 'monkey_pictures')

  //Initialize marray that stores all 64 monkeys
  const[monkeys, setMonkeys] = useState([]);
  const[leftMonkey, setLeftMonkey] = useState(null);
  const[rightMonkey, setRightMonkey] = useState(null);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    console.log("Begin storage reference")
      listAll(storageRef).then((res) => {

        res.items.forEach((itemRef, index=0) => {
          
          getDownloadURL(itemRef).then((url) => {

            setMonkeys(prevImageData => ({
              ...prevImageData,
              [index]: new Monkey(index, humanize(itemRef.name.substring(0,itemRef.name.length - 4)), url)   
            }));
            
          }).catch((error) => {
            console.log(error);
          });
      
        })
      }); 
      
  }, []);

  // Once the images have fully been stored from firebase, begin display
  useEffect(() => {
    if(Object.keys(monkeys).length === 64 && display === false) {
      console.log("Done.")
      setDisplay(true);
      const index1 = Math.floor(Math.random() * 64);
      let index2 = Math.floor(Math.random() * 63);
      if (index2 === index1) {
        index2++;
      }
      setLeftMonkey(monkeys[index1]);
      setRightMonkey(monkeys[index2]);
      
    }
  })




  return (
    <>
      {display ?  
         <div className='buttons'>
        <Image
          src={leftMonkey.url}
          alt="my_image"
          width={500}
          height={500}
          // onClick={leftClick}
        />
        <Image
          src={rightMonkey.url}
          alt="my_image"
          width={500}
          height={500}
          // onClick={rightClick}
        />

        
        <h1>
          {leftMonkey.name}
        </h1>
          
        <h1>
          {rightMonkey.name}
        </h1>   
        </div> 
      : <div> Loading </div>} 
    
    {/* <div className='list'>Available numbers: {numbers.join(', ')}</div> */}
    
    </>
  );
}