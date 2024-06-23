"use client";
import PrimarySideBar from "./common/primarysidebar";
import TracksSideBar from "./common/tracksbar";
import useFetch from "./hooks/useFetch";
import Loader from "./common/loader";
import Error from "./common/errror";
import { useEffect, useRef, useState } from "react";
import { SongType } from "@/app/types";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SpotifyLogo from "@/assets/spotify.png";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Home() {
  const { data, isLoading, error } = useFetch(
    "https://cms.samespace.com/items/songs"
  );
  const [currentSong, setCurrentSong] = useState<SongType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSongClick = (song: SongType, index: number) => {
    setCurrentSong(song);
    setCurrentIndex(index);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (data && data.data) {
      const nextIndex = (currentIndex + 1) % data.data.length;
      setCurrentSong(data.data[nextIndex]);
      setCurrentIndex(nextIndex);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handlePrevious = () => {
    if (data && data.data) {
      const prevIndex =
        (currentIndex - 1 + data.data.length) % data.data.length;
      setCurrentSong(data.data[prevIndex]);
      setCurrentIndex(prevIndex);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      setProgress((currentTime / duration) * 100);
    }
  };

  useEffect(() => {
    if (data && data.data.length > 0) {
      setCurrentSong(data.data[0]);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
    <div className="bg-[#19202d] flex justify-between p-4 pb-0 md:p-6 lg:hidden">
      <Link href="/" className="flex items-center gap-2 w-10">
        <Image src={SpotifyLogo} alt="Spotify logo" height={50} width={50} />
        <p className="font-bold text-xl text-white">Spotify</p>
      </Link>
      <div className="">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
    
    <main className="flex flex-col-reverse min-h-screen p-4 md:p-6 bg-[#19202d] text-[#FFF] md:flex-row">
      <div className="overflow-y-auto h-full w-[220px] hidden lg:block">
        <PrimarySideBar />
      </div>
      
      <div className="overflow-y-auto h-full w-full md:w-[300px] mt-12 md:mt-0">
        <TracksSideBar songs={data?.data} onSongClick={handleSongClick}  />
      </div>
      <div className="md:min-h-[80vh] h-full flex flex-grow justify-center items-center mt-8 ml-0 md:ml-10">
        {currentSong && (
          <div className="w-full max-w-xl">
            <h3 className="font-bold text-2xl">{currentSong.name}</h3>
            <p className="text-gray-500 mt-1">{currentSong.artist}</p>
            <Image
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt={currentSong.name}
              height={300}
              width={300}
              className="mt-6 rounded-md h-[200px] md:h-[440px] w-full"
            />
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}>
              <source src={currentSong.url} type="audio/mp3" />
            </audio>
            <div className="w-full bg-gray-600 h-1 mt-4 rounded-md">
              <div
                className="bg-white h-1 rounded-md"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={handlePrevious}
              >
                <FaBackward />
              </button>
              <button
                onClick={togglePlayPause}
                className="px-4 py-4 bg-black rounded-full"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={handleNext}
              >
                <FaForward />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  );
}
