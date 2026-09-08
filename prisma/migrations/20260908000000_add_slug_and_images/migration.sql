-- Add images column with a safe default for existing rows
ALTER TABLE "Project" ADD COLUMN "images" TEXT[] NOT NULL DEFAULT '{}';

-- Add slug as nullable first so existing rows aren't rejected
ALTER TABLE "Project" ADD COLUMN "slug" TEXT;

-- Backfill slugs from existing titles (lowercase, non-alphanumeric -> hyphen, trimmed)
UPDATE "Project"
SET "slug" = lower(regexp_replace(regexp_replace(trim(title), '[^a-zA-Z0-9]+', '-', 'g'), '(^-+)|(-+$)', '', 'g'));

-- De-duplicate any slugs that collided during backfill by appending part of the id
UPDATE "Project" p
SET "slug" = p."slug" || '-' || right(p."id", 4)
WHERE p."slug" IN (
  SELECT "slug" FROM "Project" GROUP BY "slug" HAVING count(*) > 1
);

-- Now that every row has a value, enforce NOT NULL + uniqueness
ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
