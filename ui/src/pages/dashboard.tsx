import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { usePlaylist } from '@/hooks/queries/use-playlists';
import { playlistsService } from '@/services/playlists.service';

export default function DashboardPage() {
  const { data: playlist, isLoading } = usePlaylist('1221876763');
  const songs = playlistsService.categorizePlaylistSongs(playlist?.songs);

  const categories = [
    { id: 1, name: 'Trending Now', songs: songs.trending },
    { id: 2, name: 'Relaxing Music', songs: songs.relaxing },
    { id: 3, name: 'Romantic Hits', songs: songs.romance },
    { id: 4, name: 'Lofi Beats', songs: songs.lofi }
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 p-8 max-w-[1600px] mx-auto w-full">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-accent/5 rounded-2xl" />
          <div className="h-64 bg-accent/5 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-48 bg-accent/5 rounded-lg" />
            <div className="h-64 bg-accent/5 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 p-8 max-w-[1600px] mx-auto w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-gradient-to-r from-background to-accent/5 rounded-2xl p-6 backdrop-blur-sm">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Welcome back, Neeraj
          </h1>
          <p className="text-muted-foreground text-lg">Here's what's happening with your music</p>
        </div>
        <Avatar className="h-14 w-14 ring-2 ring-border shadow-lg">
          <img
            src="https://github.com/shadcn.png"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </Avatar>
      </div>

      {/* Recent Activity Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Recent Activity
          </h2>
          <Button variant="outline" className="rounded-xl hover:bg-accent/10">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {songs.trending.slice(0, 3).map((track) => (
            <div
              key={track.id}
              className="group rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:bg-accent/5 transition-colors cursor-pointer overflow-hidden"
            >
              <div className="aspect-[4/3] sm:aspect-[3/2] relative">
                <img
                  src={track.image}
                  alt={track.song}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-medium tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                  {track.song}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-0.5">
                  {track.primary_artists}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                    {Math.floor(parseInt(track.duration) / 60)}:
                    {(parseInt(track.duration) % 60).toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                    {track.album}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {category.name}
              </h2>
              <Button variant="ghost" className="rounded-xl hover:bg-accent/10">
                See All
              </Button>
            </div>
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {category.songs.map((song) => (
                  <div
                    key={song.id}
                    className="flex-shrink-0 cursor-pointer space-y-4 transition-all hover:scale-[1.02] group w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
                  >
                    <div className="space-y-3">
                      <div className="aspect-square overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-shadow">
                        <img
                          src={song.image}
                          alt={song.song}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="px-1">
                        <h3 className="font-semibold tracking-tight line-clamp-1">{song.song}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {song.primary_artists}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
