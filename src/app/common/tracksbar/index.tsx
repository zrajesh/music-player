import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import SearchBar from "../searchbar";
import SongCard from "../songcard";
import { SongType } from "@/app/types";
import { useState } from "react";

const TracksSideBar: React.FC<{ songs?: SongType[] | null, onSongClick: (song: SongType, index: number) => void }> = ({ songs, onSongClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs?.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Tabs defaultValue="foryou">
      <TabsList className="flex gap-10">
        <TabsTrigger value="foryou" className="text-gray-500 font-bold text-xl">
          For You
        </TabsTrigger>
        <TabsTrigger
          value="toptracks"
          className="text-gray-500 font-bold text-xl"
        >
          Top Tracks
        </TabsTrigger>
      </TabsList>
      <TabsContent value="foryou" className="tabs-content">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Song, Artist" />
        {filteredSongs?.map((song: SongType, index: number) => (
          <div key={song?.id ?? index} onClick={() => onSongClick(song, index)}>
            <SongCard song={song} />
          </div>
        ))}
        
      </TabsContent>
      <TabsContent value="toptracks" className="tabs-content">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Top Tracks, Artist" />
        {filteredSongs?.filter(song => song.top_track)?.map((song: SongType, index: number) => (
          <div key={song?.id ?? index} onClick={() => onSongClick(song, index)}>
            <SongCard song={song} />
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default TracksSideBar;
