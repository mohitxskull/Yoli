import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Project } from "@/types";
import { ShoppingCart, CheckCircle, Loader2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  isAddingToCart?: boolean;
  isSaved?: boolean;
}

export default function ProjectCard({
  project,
  onAddToCart,
  onRemoveFromCart,
  isAddingToCart = false,
  isSaved = false,
}: ProjectCardProps) {
  const { title, description, author, category, imageUrl } = project;

  const showAddToCart = !!onAddToCart && !isSaved;
  const showRemoveCart = !!onRemoveFromCart && isSaved;

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="aspect-video relative bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400.png";
              }}
            />
          ) : (
            <Image
              src="https://placehold.co/600x400.png"
              alt="Placeholder"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {category && (
          <p className="text-xs text-muted-foreground mb-1">{category}</p>
        )}
        <CardTitle className="text-lg font-semibold mb-1 leading-tight">
          {title}
        </CardTitle>

        {author && (
          <CardDescription className="text-sm text-muted-foreground mb-2">
            By {author}
          </CardDescription>
        )}

        <p className="text-sm text-muted-foreground line-clamp-3">
          {description || "No description available."}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {showAddToCart && (
          <Button
            onClick={onAddToCart}
            disabled={isAddingToCart}
            className="w-full"
            variant="outline"
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </>
            )}
          </Button>
        )}
        {showRemoveCart && (
          <Button
            onClick={onRemoveFromCart}
            variant="secondary"
            className="w-full"
          >
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Saved
          </Button>
        )}

        {!showAddToCart && !showRemoveCart && isSaved && (
          <Button disabled className="w-full" variant="ghost">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Saved
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
