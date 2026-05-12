import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
            404
          </EmptyTitle>
          <EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
            길을 잃었습니다! 그 대신 제 블로그 구경하실래요?
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button nativeButton={false} render={<Link href="/" />}>
              <HomeIcon data-icon="inline-start" />
              돌아가기
            </Button>

            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href="https://chillinyami.tistory.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <CompassIcon data-icon="inline-start" />
              개인 블로그
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
