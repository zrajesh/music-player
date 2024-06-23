import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SongType } from "@/app/types";
import { useEffect, useState } from "react";

interface Props {
  song: SongType; 
}

const SongCard: React.FC<Props> = ({ song }) => {

  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    const audio = new Audio(song.url);
    audio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      setDuration(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    });
  }, [song.url]);

  return (
    <div className="flex justify-between items-center mt-4 cursor-pointer song-card">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={`https://cms.samespace.com/assets/${song?.cover}`}
            alt="user"
            className="w-12 h-12 rounded-full"
          />
          <AvatarFallback>Icon</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg">{song?.name}</p>
          <p className="text-gray-500 text-[16px]">{song?.artist}</p>
        </div>
      </div>

      <div className="text-gray-500 text-[16px]">{duration}</div>
    </div>
  );
};

export default SongCard;
