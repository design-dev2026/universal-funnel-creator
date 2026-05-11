-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin', 'owner');

-- CreateEnum
CREATE TYPE "project_status" AS ENUM ('draft', 'active', 'paused', 'archived');

-- CreateEnum
CREATE TYPE "integration_status" AS ENUM ('active', 'disconnected', 'error');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_details" JSONB,
    "audience_profile" JSONB,
    "goal" TEXT,
    "budget" DOUBLE PRECISION,
    "status" "project_status" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funnel_blueprints" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "blueprint_json" JSONB NOT NULL,
    "performance_snapshot" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funnel_blueprints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rule_sets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "conditions" JSONB NOT NULL,
    "actions" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "rule_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "copy_templates" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "awareness_stage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "copy_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_integrations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "encrypted_credentials" TEXT NOT NULL,
    "status" "integration_status" NOT NULL DEFAULT 'active',

    CONSTRAINT "channel_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "step_node_id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "metadata" JSONB,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_signups" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "beta_signups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "projects_user_id_idx" ON "projects"("user_id");

-- CreateIndex
CREATE INDEX "projects_user_id_status_idx" ON "projects"("user_id", "status");

-- CreateIndex
CREATE INDEX "projects_user_id_created_at_idx" ON "projects"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "projects_status_created_at_idx" ON "projects"("status", "created_at");

-- CreateIndex
CREATE INDEX "funnel_blueprints_project_id_created_at_idx" ON "funnel_blueprints"("project_id", "created_at");

-- CreateIndex
CREATE INDEX "rule_sets_priority_idx" ON "rule_sets"("priority");

-- CreateIndex
CREATE INDEX "copy_templates_lookup_idx" ON "copy_templates"("type", "product_type", "awareness_stage");

-- CreateIndex
CREATE INDEX "copy_templates_created_at_idx" ON "copy_templates"("created_at");

-- CreateIndex
CREATE INDEX "channel_integrations_user_id_idx" ON "channel_integrations"("user_id");

-- CreateIndex
CREATE INDEX "channel_integrations_user_id_provider_idx" ON "channel_integrations"("user_id", "provider");

-- CreateIndex
CREATE INDEX "channel_integrations_user_id_status_idx" ON "channel_integrations"("user_id", "status");

-- CreateIndex
CREATE INDEX "analytics_events_project_id_timestamp_idx" ON "analytics_events"("project_id", "timestamp");

-- CreateIndex
CREATE INDEX "analytics_events_project_id_event_timestamp_idx" ON "analytics_events"("project_id", "event", "timestamp");

-- CreateIndex
CREATE INDEX "analytics_events_project_id_step_node_id_timestamp_idx" ON "analytics_events"("project_id", "step_node_id", "timestamp");

-- CreateIndex
CREATE INDEX "analytics_events_timestamp_idx" ON "analytics_events"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "beta_signups_email_key" ON "beta_signups"("email");

-- CreateIndex
CREATE INDEX "beta_signups_created_at_idx" ON "beta_signups"("created_at");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funnel_blueprints" ADD CONSTRAINT "funnel_blueprints_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_integrations" ADD CONSTRAINT "channel_integrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
