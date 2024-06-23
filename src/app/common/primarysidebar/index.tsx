import Image from "next/image";
import Link from "next/link";
import SpotifyLogo from "@/assets/spotify.png";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const PrimarySideBar = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 w-10">
        <Image src={SpotifyLogo} alt="Spotify logo" height={50} width={50} />
        <p className="font-bold text-xl">Spotify</p>
      </Link>
      <div className="fixed bottom-6">
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
  );
};

export default PrimarySideBar;
