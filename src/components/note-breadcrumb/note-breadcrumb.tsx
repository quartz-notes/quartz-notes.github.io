import useSpaceStore from "@/app/stores/spaces.store";
import getById from "@/shared/lib/get-by-id";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/breadcrumb";
import NoteTitle from "./note-title";
import { TextMorph } from "@/shared/ui/text-morph";

function NoteBreadcrumb() {
  const spaces = useSpaceStore((state) => state.spaces);
  const currentSpace = useSpaceStore((state) => state.currentSpace);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">
            <TextMorph>{getById(spaces, currentSpace)!.name}</TextMorph>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <NoteTitle />
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default NoteBreadcrumb;
